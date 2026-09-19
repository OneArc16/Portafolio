import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { cn } from "cn";

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
  { label: "Correo", href: `mailto:${siteConfig.email}`, icon: Mail },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {socialLinks.map(({ label, href, icon: Icon }) => {
        const external = !href.startsWith("mailto:");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
