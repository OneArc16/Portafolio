import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { brandColors, geistRegular, geistSemiBold } from "@/lib/brand-image";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const gridLine = "rgba(255, 255, 255, 0.06)";
const glow = "rgba(43, 127, 255, 0.35)";
const glowEnd = "rgba(43, 127, 255, 0)";

// Satori measures words one at a time and overestimates some of them,
// which leaves uneven gaps. Shaping each line as a single run avoids that,
// so lines are broken here and words joined with non-breaking spaces.
const singleLine = (text: string) => text.replaceAll(" ", " ");

function toLines(text: string, maxChars: number): string[] {
  const lineCount = Math.ceil(text.length / maxChars);
  const target = text.length / lineCount;
  const lines: string[] = [];
  let current = "";

  for (const word of text.split(" ")) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > target && lines.length < lineCount - 1) {
      if (!current || next.length - target < target - current.length) {
        lines.push(next);
        current = "";
      } else {
        lines.push(current);
        current = word;
      }
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);

  return lines.map(singleLine);
}

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          fontFamily: "Geist",
          color: brandColors.foreground,
          backgroundColor: brandColors.background,
          backgroundImage: `radial-gradient(ellipse 60% 70% at 50% 0%, ${glow}, ${glowEnd}), linear-gradient(to right, ${gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 14,
            background: brandColors.primary,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -1,
          }}
        >
          DC
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          {singleLine(siteConfig.name)}
        </div>
        <div
          style={{ marginTop: 24, fontSize: 40, color: brandColors.primaryGlow }}
        >
          {singleLine(siteConfig.role)}
        </div>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            fontSize: 32,
            lineHeight: 1.35,
            color: brandColors.mutedForeground,
          }}
        >
          {toLines(siteConfig.tagline, 55).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: await geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: await geistSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
