import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/social-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <SocialLinks />
      </div>
    </header>
  );
}
