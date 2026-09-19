import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] left-1/2 h-[26rem] w-[44rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]"
      />

      <div className="relative flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {siteConfig.availability}
        </span>

        {/* Name and tagline are the LCP candidates; fading them in delayed
            LCP by ~800ms, so only the badge and buttons animate. */}
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>

        <p className="text-lg text-muted-foreground text-balance sm:text-xl">
          <span className="text-foreground">{siteConfig.role}.</span>{" "}
          {siteConfig.tagline}
        </p>

        <div
          className="animate-fade-up flex flex-col gap-3 pt-2 sm:flex-row"
          style={{ animationDelay: "120ms" }}
        >
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="#proyectos" />}
          >
            Ver proyectos
            <ArrowRight />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href="#contacto" />}
          >
            <Mail />
            Contacto
          </Button>
        </div>
      </div>
    </section>
  );
}
