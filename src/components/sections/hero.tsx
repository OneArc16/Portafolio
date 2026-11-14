import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { CodeWindow } from "@/components/code-window";
import { cn } from "cn";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      {/* Aurora blobs drifting behind the content. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[15%] h-[22rem] w-[22rem] max-w-[70vw] rounded-full bg-primary/30 blur-[110px] motion-safe:animate-aurora" />
        <div
          className="absolute top-[30%] right-[10%] h-[20rem] w-[20rem] max-w-[60vw] rounded-full bg-violet-500/25 blur-[110px] motion-safe:animate-aurora"
          style={{ animationDelay: "-6s", animationDuration: "22s" }}
        />
        <div
          className="absolute bottom-[5%] left-[40%] h-[18rem] w-[18rem] max-w-[60vw] rounded-full bg-sky-400/20 blur-[110px] motion-safe:animate-aurora"
          style={{ animationDelay: "-12s", animationDuration: "26s" }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {siteConfig.availability}
          </span>

          <div className="space-y-3">
            <p className="font-mono text-sm text-primary">Hola, soy</p>
            {/* Name and tagline are the LCP candidates; fading them in delayed
                LCP by ~800ms, so they paint immediately. The shimmer only
                moves the gradient, it never hides the text. */}
            <h1 className="bg-linear-to-r from-foreground via-primary to-foreground bg-size-[200%_auto] bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-balance text-transparent motion-safe:animate-shimmer sm:text-6xl lg:text-7xl dark:via-sky-300">
              {siteConfig.name}
            </h1>
          </div>

          <p className="max-w-xl text-lg text-muted-foreground text-balance sm:text-xl">
            <span className="text-foreground">{siteConfig.role}.</span>{" "}
            {siteConfig.tagline}
          </p>

          <div
            className="animate-fade-up flex flex-col gap-3 pt-2 sm:flex-row"
            style={{ animationDelay: "120ms" }}
          >
            <a
              href="#proyectos"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-primary/50",
              )}
            >
              Ver proyectos
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "bg-card/50 backdrop-blur transition-all hover:-translate-y-0.5",
              )}
            >
              <Mail />
              Contacto
            </a>
          </div>
        </div>

        <div
          className="animate-fade-up relative flex justify-center lg:justify-end"
          style={{ animationDelay: "200ms" }}
        >
          <div className="w-full max-w-md motion-safe:animate-float">
            <CodeWindow />
          </div>
          <span
            aria-hidden
            className="absolute -top-4 left-2 hidden rounded-full border bg-card/80 px-3 py-1 font-mono text-xs shadow-lg backdrop-blur motion-safe:animate-float sm:block lg:-left-6"
            style={{ animationDelay: "-2s" }}
          >
            ⚛️ React
          </span>
          <span
            aria-hidden
            className="absolute right-2 -bottom-4 hidden rounded-full border bg-card/80 px-3 py-1 font-mono text-xs shadow-lg backdrop-blur motion-safe:animate-float sm:block lg:-right-4"
            style={{ animationDelay: "-4s" }}
          >
            ✨ UI/UX
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-9 w-5 justify-center rounded-full border-2 border-muted-foreground/40 pt-1.5">
          <span className="size-1.5 rounded-full bg-muted-foreground motion-safe:animate-scroll-cue" />
        </div>
      </div>
    </section>
  );
}
