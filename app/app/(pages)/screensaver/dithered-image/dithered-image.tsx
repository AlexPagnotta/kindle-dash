"use client";

import { useEffect, useRef, useState } from "react";
import { atkinsonDithering } from "./utils";

type DitheredImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export const DitheredImage = ({ src, alt, className }: DitheredImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const applyDithering = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      try {
        setHasError(false);

        // Load the image
        const img = new Image();
        img.crossOrigin = "anonymous";

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
          img.src = src;
        });

        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply Atkinson dithering
        atkinsonDithering(data, canvas.width, canvas.height);

        // Put the dithered image back
        ctx.putImageData(imageData, 0, 0);
      } catch (err) {
        console.error(err);
        setHasError(true);
      }
    };

    applyDithering();
  }, [src]);

  if (hasError) {
    return (
      <div className="flex items-center justify-center size-full">
        <p>Error loading image</p>
      </div>
    );
  }

  return (
    <div className="relative size-full">
      <canvas ref={canvasRef} title={alt} className={className} />
    </div>
  );
};
