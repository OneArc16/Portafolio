import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// ImageResponse can't read CSS variables or oklch(), so these mirror the
// dark theme tokens in globals.css as hex.
export const brandColors = {
  background: "#090a0e",
  card: "#131519",
  foreground: "#fafafa",
  mutedForeground: "#9ea3ad",
  primary: "#155dfc",
  primaryGlow: "#2b7fff",
};

const fontsDir = join(process.cwd(), "src/assets/fonts");
export const geistRegular = readFile(join(fontsDir, "Geist-Regular.ttf"));
export const geistSemiBold = readFile(join(fontsDir, "Geist-SemiBold.ttf"));

export async function renderMonogram(
  size: { width: number; height: number },
  { rounded }: { rounded: boolean },
) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.primary,
          borderRadius: rounded ? size.width * 0.22 : 0,
          color: brandColors.foreground,
          fontFamily: "Geist",
          fontSize: size.width * 0.46,
          fontWeight: 600,
          letterSpacing: -size.width * 0.02,
        }}
      >
        DC
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: await geistSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
