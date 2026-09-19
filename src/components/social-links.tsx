import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
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
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          aria-label={label}
          nativeButton={false}
          render={
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            />
          }
        >
          <Icon />
        </Button>
      ))}
    </div>
  );
}
