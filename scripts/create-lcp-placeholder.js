const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(
  __dirname,
  "../public/assets/images/carousel-images"
);
const outputDir = path.join(
  __dirname,
  "../public/assets/images/carousel-images-optimized"
);

async function createLCPPlaceholder() {
  console.log("🔄 Creating LCP placeholder image...");

  try {
    // i am creating a tiny, ultra-compressed placeholder from the first carousel image
    const inputPath = path.join(inputDir, "carousel-image3.jpg");
    const outputPath = path.join(outputDir, "carousel-image3-lcp.webp");

    if (!fs.existsSync(inputPath)) {
      console.log("⚠️  Input image not found, skipping placeholder creation");
      return;
    }

    await sharp(inputPath)
      .resize(400, 300, {
        fit: "cover",
        position: "center",
      })
      .webp({
        quality: 30, // Very low quality for instant loading
        effort: 6,
      })
      .toFile(outputPath);

    console.log(`✅ Created LCP placeholder: ${outputPath}`);

    // Get file size
    const stats = fs.statSync(outputPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 Placeholder size: ${fileSizeInKB} KB`);
  } catch (error) {
    console.error("❌ Error creating LCP placeholder:", error.message);
  }
}

createLCPPlaceholder().catch(console.error);
