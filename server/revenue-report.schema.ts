/**
 * Revenue Report endpoint — shared schema + HTML email template.
 *
 * The client submits its raw calculator inputs (locations, appts,
 * ticket) plus an email. The server re-computes the leakage from
 * the canonical model at shared/leakage.ts — the client is never
 * trusted to pass the result number (prevents a malicious visitor
 * from getting an email with a fabricated figure).
 */

import { z } from "zod";
import {
  computeLeakage,
  formatCurrency,
  formatCurrencyCompact,
  BENCHMARKS,
  RECOVERY,
  type LeakageBreakdown,
} from "../shared/leakage.js";
import { escapeHtml } from "./contact.schema.js";

export const revenueReportSchema = z.object({
  email: z.string().email("Valid email required").max(200),
  name: z.string().trim().max(200).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  locations: z.number().int().min(1).max(100),
  apptsPerLocation: z.number().int().min(1).max(5000),
  avgTicket: z.number().int().min(1).max(5000),
});

export type RevenueReportData = z.infer<typeof revenueReportSchema>;

/**
 * Build the 1-page HTML email report. All user-provided values are
 * HTML-escaped to prevent injection. Computed leakage comes from the
 * canonical shared model — never trust client-passed numbers.
 */
export function buildReportEmail(data: RevenueReportData): {
  subject: string;
  html: string;
  text: string;
} {
  const result: LeakageBreakdown = computeLeakage({
    locations: data.locations,
    monthlyApptsPerLocation: data.apptsPerLocation,
    avgTicket: data.avgTicket,
  });

  const name = data.name || "there";
  const greeting = data.name ? escapeHtml(data.name) : "there";

  const subject = `Your revenue gap report — ${formatCurrencyCompact(result.recoveryAnnual.expected)} estimated recovery`;

  // Plain-text fallback for clients that don't render HTML
  const text = `
Hi ${name},

Here's the revenue gap report you requested from Etienne.

Your inputs:
  Locations:          ${data.locations}
  Appts / location:   ${data.apptsPerLocation} per month
  Avg ticket:         ${formatCurrency(data.avgTicket)}

Estimated addressable leakage:
  Monthly gap:        ${formatCurrency(result.totalMonthlyGap)}
  Annual gap:         ${formatCurrency(result.totalAnnualGap)}
  % of revenue:       ${result.gapAsPctOfRevenue.toFixed(1)}%

Recovery range (annual):
  Conservative (${Math.round(RECOVERY.low * 100)}%):   ${formatCurrency(result.recoveryAnnual.low)}
  Expected (${Math.round(RECOVERY.expected * 100)}%):       ${formatCurrency(result.recoveryAnnual.expected)}
  Upside (${Math.round(RECOVERY.high * 100)}%):         ${formatCurrency(result.recoveryAnnual.high)}

Top losses:
  Demand-side (${result.demandLossSource}): ${formatCurrency(
    result.demandLossSource === "utilization" ? result.utilizationLoss : result.noShowLoss
  )}
  Rebooking gap:       ${formatCurrency(result.rebookingLoss)}
  Missed-call loss:    ${formatCurrency(result.missedCallLoss)}

Methodology: Benchmarks sourced from AmSpa, Mindbody Wellness Index,
Zenoti, and Marchex. No-show floor ${BENCHMARKS.noShow.floor}%, utilization
median ${BENCHMARKS.utilization.median}%, rebooking median ${BENCHMARKS.rebooking.median}%.
Losses computed against industry median (not top-decile) and deduplicated
to avoid double-counting.

Ready to see your actual numbers from real booking data?
Book a 20-minute call with Jim: https://calendly.com/jim-etienneagency/30min

— The Etienne team
`.trim();

  // HTML version
  const noteItems = result.notes.length > 0
    ? `<ul style="margin: 12px 0; padding-left: 18px; color: #6B7280; font-size: 13px; line-height: 1.6;">${result.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>`
    : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0A0F1C;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0A0F1C 0%, #141929 100%); border-radius: 16px 16px 0 0; padding: 32px 28px; color: #ffffff;">
      <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #00D4AA; margin: 0 0 8px 0; font-weight: 600;">
        YOUR REVENUE GAP REPORT
      </p>
      <h1 style="font-family: Georgia, serif; font-size: 28px; line-height: 1.15; margin: 0 0 16px 0; color: #ffffff; font-weight: 700;">
        Hi ${greeting} — here's what we estimate you're leaving on the table.
      </h1>
      <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.55;">
        This is an industry-benchmark estimate using the same leakage model Etienne applies to real booking data.
      </p>
    </div>

    <!-- Big number card -->
    <div style="background: #ffffff; padding: 32px 28px; border-left: 1px solid #E2E4EA; border-right: 1px solid #E2E4EA;">
      <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #6B7280; margin: 0 0 6px 0; font-weight: 600;">
        Estimated recovery, annualized
      </p>
      <p style="font-family: Georgia, serif; font-size: 36px; line-height: 1.1; margin: 0 0 6px 0; color: #00D4AA; font-weight: 700;">
        ${formatCurrency(result.recoveryAnnual.low)} – ${formatCurrency(result.recoveryAnnual.high)}
      </p>
      <p style="margin: 0 0 20px 0; color: #4A5568; font-size: 14px;">
        Expected case: <strong style="color: #0A0F1C;">${formatCurrency(result.recoveryAnnual.expected)}/year</strong>
      </p>

      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-top: 8px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F8; color: #4A5568; font-size: 13px;">Your monthly revenue</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F8; text-align: right; font-weight: 600; color: #0A0F1C;">${formatCurrency(result.totalMonthlyRevenue)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F8; color: #4A5568; font-size: 13px;">Addressable monthly gap</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F8; text-align: right; font-weight: 600; color: #FF6B6B;">-${formatCurrency(result.totalMonthlyGap)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F8; color: #4A5568; font-size: 13px;">Gap as % of revenue</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F8; text-align: right; font-weight: 600; color: #00D4AA;">${result.gapAsPctOfRevenue.toFixed(1)}%</td>
        </tr>
      </table>
    </div>

    <!-- Breakdown -->
    <div style="background: #ffffff; padding: 0 28px 24px 28px; border-left: 1px solid #E2E4EA; border-right: 1px solid #E2E4EA;">
      <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #6B7280; margin: 20px 0 12px 0; font-weight: 600;">
        Top losses
      </p>

      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 16px; background: #F8FAFC; border-radius: 8px 8px 0 0; border: 1px solid #E2E4EA; border-bottom: none;">
            <p style="margin: 0; color: #0A0F1C; font-size: 14px; font-weight: 600;">
              ${result.demandLossSource === "utilization" ? "Utilization gap" : "Excess no-shows"}
            </p>
            <p style="margin: 2px 0 0 0; color: #4A5568; font-size: 12px;">
              ${result.demandLossSource === "utilization"
                ? `Below the ${BENCHMARKS.utilization.median}% industry median`
                : `Above the ${BENCHMARKS.noShow.floor}% industry floor`}
            </p>
          </td>
          <td style="padding: 12px 16px; background: #F8FAFC; border-radius: 8px 8px 0 0; border: 1px solid #E2E4EA; border-bottom: none; text-align: right; font-family: Georgia, serif; font-size: 18px; color: #0A0F1C; font-weight: 700; vertical-align: middle;">
            ${formatCurrency(
              result.demandLossSource === "utilization" ? result.utilizationLoss : result.noShowLoss
            )}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; background: #F8FAFC; border-left: 1px solid #E2E4EA; border-right: 1px solid #E2E4EA; border-bottom: none;">
            <p style="margin: 0; color: #0A0F1C; font-size: 14px; font-weight: 600;">Rebooking gap</p>
            <p style="margin: 2px 0 0 0; color: #4A5568; font-size: 12px;">Below the ${BENCHMARKS.rebooking.median}% industry median</p>
          </td>
          <td style="padding: 12px 16px; background: #F8FAFC; border-right: 1px solid #E2E4EA; border-bottom: none; text-align: right; font-family: Georgia, serif; font-size: 18px; color: #0A0F1C; font-weight: 700; vertical-align: middle;">
            ${formatCurrency(result.rebookingLoss)}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; background: #F8FAFC; border-radius: 0 0 8px 8px; border: 1px solid #E2E4EA; border-top: none;">
            <p style="margin: 0; color: #0A0F1C; font-size: 14px; font-weight: 600;">Missed-call loss</p>
            <p style="margin: 2px 0 0 0; color: #4A5568; font-size: 12px;">After-hours + unanswered calls (Marchex)</p>
          </td>
          <td style="padding: 12px 16px; background: #F8FAFC; border-radius: 0 0 8px 8px; border: 1px solid #E2E4EA; border-top: none; text-align: right; font-family: Georgia, serif; font-size: 18px; color: #0A0F1C; font-weight: 700; vertical-align: middle;">
            ${formatCurrency(result.missedCallLoss)}
          </td>
        </tr>
      </table>

      ${noteItems ? `<div style="margin-top: 16px; padding: 12px 14px; background: #F3F4F8; border-radius: 8px; border-left: 3px solid #00D4AA;"><p style="margin: 0 0 4px 0; color: #0A0F1C; font-size: 12px; font-weight: 600;">How we computed this</p>${noteItems}</div>` : ""}
    </div>

    <!-- CTA -->
    <div style="background: #ffffff; padding: 8px 28px 32px 28px; border-left: 1px solid #E2E4EA; border-right: 1px solid #E2E4EA; border-bottom: 1px solid #E2E4EA; border-radius: 0 0 16px 16px; text-align: center;">
      <p style="margin: 16px 0 20px 0; color: #4A5568; font-size: 15px; line-height: 1.6;">
        This is an industry-benchmark estimate. Want to see your <strong style="color: #0A0F1C;">actual</strong> numbers from real booking data?
      </p>
      <a href="https://calendly.com/jim-etienneagency/30min" style="display: inline-block; background: #00D4AA; color: #0A0F1C; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(0,212,170,0.3);">
        Book a 20-min call with Jim →
      </a>
      <p style="margin: 16px 0 0 0; color: #9CA3AF; font-size: 12px;">
        No pitch deck. No commitment. Just the numbers.
      </p>
    </div>

    <!-- Methodology footer -->
    <p style="margin: 20px 0 0 0; padding: 0 4px; color: #9CA3AF; font-size: 11px; line-height: 1.6; text-align: center;">
      Benchmarks sourced from AmSpa, Mindbody Wellness Index, Zenoti, and Marchex industry data.
      Losses computed against industry median (not top-decile) and deduplicated to avoid double-counting.
      Recovery range reflects 25–45% of total addressable gap.
    </p>
    <p style="margin: 12px 0 0 0; color: #9CA3AF; font-size: 11px; text-align: center;">
      Etienne Agency · <a href="https://etienneagency.com" style="color: #00D4AA; text-decoration: none;">etienneagency.com</a>
    </p>
  </div>
</body>
</html>
  `.trim();

  return { subject, html, text };
}
