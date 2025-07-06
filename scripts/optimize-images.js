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

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  "carousel-image1.jpg",
  "carousel-image2.jpg",
  "carousel-image3.jpg",
];

async function optimizeImages() {
  console.log("🔄 Optimizing carousel images for LCP...");

  for (const image of images) {
    const inputPath = path.join(inputDir, image);
    const outputPath = path.join(outputDir, image);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${image} - file not found`);
      continue;
    }

    try {
      // Create LCP-optimized WebP (much smaller, faster loading)
      await sharp(inputPath)
        .resize(800, 600, {
          fit: "cover",
          position: "center",
        })
        .webp({
          quality: 60, // Lower quality for faster loading
          effort: 6, // Higher compression
        })
        .toFile(outputPath.replace(".jpg", ".webp"));

      console.log(
        `✅ LCP-optimized ${image} -> ${image.replace(".jpg", ".webp")}`
      );

      // Create even smaller JPEG for fallback
      await sharp(inputPath)
        .resize(600, 450, {
          fit: "cover",
          position: "center",
        })
        .jpeg({
          quality: 60,
          progressive: true,
        })
        .toFile(outputPath);

      console.log(`✅ Created small JPEG version of ${image}`);
    } catch (error) {
      console.error(`❌ Error optimizing ${image}:`, error.message);
    }
  }

  console.log("🎉 LCP image optimization complete!");
}

optimizeImages().catch(console.error);
