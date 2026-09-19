import { renderMonogram } from "@/lib/brand-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so the square stays full-bleed.
export default function AppleIcon() {
  return renderMonogram(size, { rounded: false });
}
