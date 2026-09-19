import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Section } from "@/components/layout/section";

export function Contact() {
  return (
    <Section id="contacto" title="Contacto">
      <div className="relative overflow-hidden rounded-2xl border bg-card p-8 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[28rem] max-w-full -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-xl font-medium text-balance sm:text-2xl">
              ¿Tienes una vacante o un proyecto en mente?
            </p>
            <p className="text-muted-foreground">
              Escríbeme a{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              o encuéntrame en mis redes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${siteConfig.email}`}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Mail />
              Enviar correo
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
