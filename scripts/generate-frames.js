const fs = require('fs');
const path = require('path');

// Minimal valid 1x1 WebP binary buffer (RIFF format header)
const sampleWebpBuffer = Buffer.from([
  0x52, 0x49, 0x46, 0x46, 0x1a, 0x00, 0x00, 0x00,
  0x57, 0x45, 0x42, 0x50, 0x56, 0x38, 0x4c, 0x00,
  0x0d, 0x00, 0x00, 0x00, 0x2f, 0x00, 0x00, 0x00,
  0x00, 0x07, 0x85, 0x08, 0x10, 0x00, 0xfe, 0x03,
  0x94, 0x00, 0x00
]);

const flavors = ['mango', 'chocolate', 'pomegranate'];
const totalFrames = 120;

flavors.forEach((flavor) => {
  const dir = path.join(__dirname, '..', 'public', 'images', flavor);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (let i = 1; i <= totalFrames; i++) {
    const filePath = path.join(dir, `${i}.webp`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, sampleWebpBuffer);
    }
  }
  console.log(`Generated ${totalFrames} webp frames for flavor: ${flavor}`);
});
