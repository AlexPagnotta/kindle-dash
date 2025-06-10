/**
 * Apply Atkinson dithering to image data
 * @param data - The image data array (RGBA format)
 * @param width - The width of the image
 * @param height - The height of the image
 */
export const atkinsonDithering = (data: Uint8ClampedArray, width: number, height: number) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Convert to grayscale
      const r = data[idx] ?? 0;
      const g = data[idx + 1] ?? 0;
      const b = data[idx + 2] ?? 0;
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

      // Apply threshold (0 or 255)
      const newColor = gray < 128 ? 0 : 255;
      const error = gray - newColor;

      // Set the new color
      data[idx] = newColor; // R
      data[idx + 1] = newColor; // G
      data[idx + 2] = newColor; // B
      // Alpha channel stays the same

      // Distribute error using Atkinson pattern
      distributeAtkinsonError(data, width, height, x, y, error);
    }
  }
};

const distributeAtkinsonError = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  error: number
) => {
  // Atkinson dithering distributes error to 6 neighboring pixels
  // Pattern:
  //     X   1/8 1/8
  // 1/8 1/8 1/8
  //     1/8
  const errorDistribution = [
    { dx: 1, dy: 0, factor: 1 / 8 }, // Right
    { dx: 2, dy: 0, factor: 1 / 8 }, // Right + 1
    { dx: -1, dy: 1, factor: 1 / 8 }, // Bottom-left
    { dx: 0, dy: 1, factor: 1 / 8 }, // Bottom
    { dx: 1, dy: 1, factor: 1 / 8 }, // Bottom-right
    { dx: 0, dy: 2, factor: 1 / 8 }, // Bottom + 1
  ];

  errorDistribution.forEach(({ dx, dy, factor }) => {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      const idx = (newY * width + newX) * 4;
      const distributedError = error * factor;

      // Apply error to RGB channels
      const currentR = data[idx] ?? 0;
      const currentG = data[idx + 1] ?? 0;
      const currentB = data[idx + 2] ?? 0;

      data[idx] = Math.max(0, Math.min(255, currentR + distributedError));
      data[idx + 1] = Math.max(0, Math.min(255, currentG + distributedError));
      data[idx + 2] = Math.max(0, Math.min(255, currentB + distributedError));
    }
  });
};
