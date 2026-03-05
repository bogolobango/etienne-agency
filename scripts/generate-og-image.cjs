/**
 * Generate OG image for etienneagency.com
 * Matches the dark hero section style with current positioning.
 * Run: node scripts/generate-og-image.cjs
 */

const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const WIDTH = 1200;
const HEIGHT = 630;

async function generate() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // Dark background matching section-dark (#0A0F1C)
  ctx.fillStyle = "#0A0F1C";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle teal radial gradient in top-right (like Hero component)
  const grad = ctx.createRadialGradient(950, 80, 0, 950, 80, 400);
  grad.addColorStop(0, "rgba(0, 212, 170, 0.12)");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Top accent bar (teal, like the site)
  ctx.fillStyle = "#00D4AA";
  ctx.fillRect(0, 0, WIDTH, 4);

  // Load and draw the logo, inverted to white for dark bg
  const logoPath = path.join(__dirname, "../client/public/images/logo.png");
  try {
    const logo = await loadImage(logoPath);
    const logoW = 160;
    const logoH = (logo.height / logo.width) * logoW;

    // Draw logo onto a temp canvas, then invert dark pixels to white
    const tmpCanvas = createCanvas(logoW, logoH);
    const tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.drawImage(logo, 0, 0, logoW, logoH);
    const imgData = tmpCtx.getImageData(0, 0, logoW, logoH);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      // Invert RGB, keep alpha
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    tmpCtx.putImageData(imgData, 0, 0);

    const logoX = (WIDTH - logoW) / 2;
    const logoY = 100;
    ctx.drawImage(tmpCanvas, logoX, logoY);
  } catch (e) {
    console.log("Logo not found, skipping:", e.message);
  }

  // Main headline text
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Title line 1
  ctx.font = "bold 52px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Revenue Intelligence for", WIDTH / 2, 335);

  // Title line 2 with teal highlight
  ctx.fillStyle = "#00D4AA";
  ctx.fillText("Multi-Location Med Spas", WIDTH / 2, 400);

  // Subtitle
  ctx.font = "24px sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText(
    "See where your locations are leaking revenue.",
    WIDTH / 2,
    470
  );

  // Bottom bar with site URL
  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.fillRect(0, HEIGHT - 50, WIDTH, 50);
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.textAlign = "center";
  ctx.fillText("etienneagency.com", WIDTH / 2, HEIGHT - 25);

  // Small teal dots (like the floating dust motes)
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const r = Math.random() * 2 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#00D4AA";
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Write to file
  const outPath = path.join(
    __dirname,
    "../client/public/images/og-image.png"
  );
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outPath, buffer);
  console.log(`OG image written to ${outPath} (${buffer.length} bytes)`);
}

generate().catch(console.error);
