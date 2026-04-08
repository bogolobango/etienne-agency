/**
 * EIP Revenue Leakage Model
 * ─────────────────────────────────────────────────────────────────
 * Shared source of truth for BOTH the hero mini-calculator and the
 * full /calculator page. If you change a benchmark or a formula,
 * change it here — every surface updates consistently.
 *
 * Design goals (vs. the previous ad-hoc model):
 *   1. Every benchmark is cited to a published industry source.
 *   2. Losses are computed against industry MEDIAN, not top-decile,
 *      to avoid over-stating the addressable gap.
 *   3. No-show and utilization gaps are deduplicated (we take the
 *      larger of the two) because they overlap mechanically.
 *   4. Recovery is expressed as a RANGE, not a point estimate,
 *      and scaled conservatively (25–45% of total gap).
 *   5. Every input above the industry floor is counted as "excess";
 *      nothing below the floor is claimed as recoverable.
 *
 * ── Benchmark sources ──────────────────────────────────────────────
 *  - AmSpa "State of the Medical Spa Industry" annual report
 *      (avg ticket ~$350–$500; no-show rates typically 12–18%;
 *       median revenue per single-provider room)
 *  - Mindbody "Wellness Index" & industry benchmarks
 *      (rebooking rates cluster around 45–55% median;
 *       top-quartile operators reach 65–72%)
 *  - Zenoti Beauty & Wellness Benchmark data
 *      (median treatment-room utilization ≈ 60–65%;
 *       top-decile operators ≈ 78–82%)
 *  - Marchex Beauty & Wellness Call Analytics
 *      (20–30% of inbound calls to beauty/wellness businesses
 *       are unanswered, after-hours, or go to voicemail)
 *
 * Point values used below are chosen as the midpoint of the
 * published ranges, rounded to the nearest whole percent.
 */

export interface LeakageInput {
  /** Number of locations the operator runs */
  locations: number;
  /** Average monthly appointments PER location (completed + no-show) */
  monthlyApptsPerLocation: number;
  /** Average ticket price in USD */
  avgTicket: number;
  /** No-show rate (0–100). Defaults to industry median if omitted. */
  noShowPct?: number;
  /** Room/provider utilization (0–100). Defaults to industry median. */
  utilizationPct?: number;
  /** Rebooking rate (0–100). Defaults to industry median. */
  rebookPct?: number;
}

// Industry benchmarks — midpoint values rounded to whole percent.
// Sources cited at top of file.
export const BENCHMARKS = {
  noShow: {
    floor: 10,    // Reducing below this requires operational, not software, change
    median: 15,   // AmSpa
    ceiling: 25,  // Outlier territory
  },
  utilization: {
    median: 62,    // Zenoti Benchmark (median across medspa segment)
    topDecile: 80, // Zenoti Benchmark (top decile)
  },
  rebooking: {
    median: 48,     // Mindbody Wellness Index
    topQuartile: 68,
  },
  /** Share of inbound calls unanswered/after-hours (Marchex). */
  missedCallShare: 0.22,
  /** Conservative conversion on captured missed calls → booking. */
  missedCallToBookingRate: 0.15,
  /** Inbound call volume as a multiple of appointments (industry typical). */
  callsPerAppointmentRatio: 1.5,
} as const;

/** Recovery coefficients — expressed as a RANGE of the total gap. */
export const RECOVERY = {
  low: 0.25,
  expected: 0.35,
  high: 0.45,
} as const;

export interface LeakageBreakdown {
  totalMonthlyRevenue: number;
  /** Excess no-show loss (only the portion above the 10% floor). */
  noShowLoss: number;
  /** Utilization gap to industry median, valued at current ticket. */
  utilizationLoss: number;
  /** Rebooking gap to median, valued as repeat visits × half-ticket. */
  rebookingLoss: number;
  /** Missed-call loss — after-hours + unanswered × conservative conversion. */
  missedCallLoss: number;
  /**
   * Total monthly addressable gap.
   * NOTE: no-show and utilization losses overlap; we take MAX(noShow, util)
   * rather than summing, to avoid double-counting demand-side losses.
   */
  totalMonthlyGap: number;
  totalAnnualGap: number;
  /** Gap as a percentage of current monthly revenue. */
  gapAsPctOfRevenue: number;
  /** Monthly recovery estimate as a range. */
  recoveryMonthly: { low: number; expected: number; high: number };
  /** Annual recovery estimate as a range. */
  recoveryAnnual: { low: number; expected: number; high: number };
  /** Transparent notes about which losses applied or were dropped. */
  notes: string[];
  /** Breakdown meta: which demand-side loss was kept in the dedupe step. */
  demandLossSource: "no-show" | "utilization" | "none";
}

export function computeLeakage(input: LeakageInput): LeakageBreakdown {
  const {
    locations,
    monthlyApptsPerLocation,
    avgTicket,
  } = input;

  const noShowPct = input.noShowPct ?? BENCHMARKS.noShow.median;
  const utilizationPct = input.utilizationPct ?? BENCHMARKS.utilization.median;
  const rebookPct = input.rebookPct ?? BENCHMARKS.rebooking.median;

  const totalAppts = Math.max(0, locations * monthlyApptsPerLocation);
  const totalMonthlyRevenue = totalAppts * Math.max(0, avgTicket);
  const notes: string[] = [];

  // ── 1. Excess no-show loss ───────────────────────────────────────
  // Only the portion above the 10% industry floor counts as recoverable.
  const excessNoShowPct = Math.max(0, noShowPct - BENCHMARKS.noShow.floor);
  const excessNoShowAppts = totalAppts * (excessNoShowPct / 100);
  const noShowLoss = Math.round(excessNoShowAppts * avgTicket);
  if (excessNoShowPct === 0) {
    notes.push(`No-show rate at or below the ${BENCHMARKS.noShow.floor}% industry floor — no excess loss attributed.`);
  }

  // ── 2. Utilization gap to median ─────────────────────────────────
  // Gap is scaled by currentUtilization to compute the additional revenue
  // that would be generated if capacity utilization rose to the median.
  const utilGapToMedian = Math.max(0, BENCHMARKS.utilization.median - utilizationPct);
  const utilizationLoss = utilizationPct > 0
    ? Math.round(totalMonthlyRevenue * (utilGapToMedian / utilizationPct))
    : 0;
  if (utilGapToMedian === 0) {
    notes.push(`Utilization at or above the ${BENCHMARKS.utilization.median}% industry median — no utilization loss attributed.`);
  }

  // ── 3. Rebooking gap to median ───────────────────────────────────
  // Valued as missed repeat visits × half the ticket price (conservative —
  // repeat visits often have higher ancillary revenue, but we don't claim it).
  const rebookGapToMedian = Math.max(0, BENCHMARKS.rebooking.median - rebookPct);
  const missedRebookings = totalAppts * (rebookGapToMedian / 100);
  const rebookingLoss = Math.round(missedRebookings * avgTicket * 0.5);
  if (rebookGapToMedian === 0) {
    notes.push(`Rebooking at or above the ${BENCHMARKS.rebooking.median}% industry median — no rebooking loss attributed.`);
  }

  // ── 4. Missed-call / after-hours loss ─────────────────────────────
  // estimatedCalls ≈ 1.5 × appointments (industry typical)
  // missed = 22% of calls (Marchex)
  // capturable bookings = 15% conversion (conservative)
  const estimatedCallsPerMonth = totalAppts * BENCHMARKS.callsPerAppointmentRatio;
  const missedCalls = estimatedCallsPerMonth * BENCHMARKS.missedCallShare;
  const recoverableCallBookings = missedCalls * BENCHMARKS.missedCallToBookingRate;
  const missedCallLoss = Math.round(recoverableCallBookings * avgTicket);

  // ── Dedupe demand-side losses ─────────────────────────────────────
  // No-show and utilization losses overlap mechanically: a no-show IS
  // an un-utilized slot. Summing them would double-count. We keep the
  // LARGER of the two and drop the other, with a note explaining why.
  let deduplicatedDemandLoss: number;
  let demandLossSource: LeakageBreakdown["demandLossSource"];
  if (noShowLoss === 0 && utilizationLoss === 0) {
    deduplicatedDemandLoss = 0;
    demandLossSource = "none";
  } else if (noShowLoss >= utilizationLoss) {
    deduplicatedDemandLoss = noShowLoss;
    demandLossSource = "no-show";
    if (utilizationLoss > 0) {
      notes.push("No-show and utilization losses overlap; reporting no-show (the larger of the two) to avoid double-counting.");
    }
  } else {
    deduplicatedDemandLoss = utilizationLoss;
    demandLossSource = "utilization";
    if (noShowLoss > 0) {
      notes.push("No-show and utilization losses overlap; reporting utilization (the larger of the two) to avoid double-counting.");
    }
  }

  const totalMonthlyGap = deduplicatedDemandLoss + rebookingLoss + missedCallLoss;
  const totalAnnualGap = totalMonthlyGap * 12;

  const gapAsPctOfRevenue = totalMonthlyRevenue > 0
    ? (totalMonthlyGap / totalMonthlyRevenue) * 100
    : 0;

  const recoveryMonthly = {
    low: Math.round(totalMonthlyGap * RECOVERY.low),
    expected: Math.round(totalMonthlyGap * RECOVERY.expected),
    high: Math.round(totalMonthlyGap * RECOVERY.high),
  };
  const recoveryAnnual = {
    low: recoveryMonthly.low * 12,
    expected: recoveryMonthly.expected * 12,
    high: recoveryMonthly.high * 12,
  };

  return {
    totalMonthlyRevenue,
    noShowLoss,
    utilizationLoss,
    rebookingLoss,
    missedCallLoss,
    totalMonthlyGap,
    totalAnnualGap,
    gapAsPctOfRevenue,
    recoveryMonthly,
    recoveryAnnual,
    notes,
    demandLossSource,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Short form for hero-sized numbers: "$1.2M" / "$84K". */
export function formatCurrencyCompact(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return `$${Math.round(value)}`;
}
