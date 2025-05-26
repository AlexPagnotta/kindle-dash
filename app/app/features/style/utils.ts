import { type cx, defineConfig } from "cva";
import { extendTailwindMerge, validators } from "tailwind-merge";

const spacingValues = [4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128, 192, 256, 384];

// Extend the default config based on the custom Tailwind config.
// Add all classNames that deviate from the standard naming convention.
// @see https://github.com/dcastil/tailwind-merge/blob/v1.14.0/src/lib/default-config.ts#L122
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [validators.isNumber, ...spacingValues.map((value) => `spacing-px-${value}`)],

      text: ["text-title-1", "text-title-2", "text-body-3", "text-body-2", "text-body-1"],

      leading: ["leading-none", "leading-sm", "leading-md", "leading-lg"],
      radius: ["rounded-none", "rounded-md", "rounded-lg", "rounded-full"],

      shadow: ["shadow-md"],
    },
  },
});

const Cva = defineConfig({
  hooks: {
    onComplete: twMerge,
  },
});

export { type VariantProps } from "cva";
export type ClassValues = Parameters<typeof cx>;

/**
 * Create class name variants and resolve Tailwind rule conflicts.
 * @see https://github.com/joe-bell/cva
 * @see https://github.com/dcastil/tailwind-merge
 */
export const cva = Cva.cva;

/**
 * Conditionally join class names and resolve Tailwind rule conflicts.
 * @see https://github.com/lukeed/clsx
 * @see https://github.com/dcastil/tailwind-merge
 */
export const cn = Cva.cx;

/**
 * Shallow merge any number of `cva` components into a single component.
 * @see https://github.com/joe-bell/cva
 */
export const compose = Cva.compose;
