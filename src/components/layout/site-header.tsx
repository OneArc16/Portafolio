import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Stack", href: "#stack" },
  { label: "Contacto", href: "#contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        {/* The site is a single page, so prefetching "/" would refetch the current page. */}
        <Link
          href="/"
          prefetch={false}
          className="font-mono text-sm font-semibold tracking-tight"
        >
          <span aria-hidden className="text-primary">
            &lt;
          </span>
          {siteConfig.name}
          <span aria-hidden className="text-primary">
            {" "}
            /&gt;
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="relative rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <SocialLinks />
          <ThemeToggle />
        </div>
      </div>
      <span
        aria-hidden
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-linear-to-r from-primary via-sky-400 to-violet-500"
      />
    </header>
  );
}
