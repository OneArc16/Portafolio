import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm text-muted-foreground">Hola, soy</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="text-lg text-muted-foreground sm:text-xl">
        {siteConfig.role}
      </p>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="#proyectos" />}
        >
          Ver proyectos
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<a href={`mailto:${siteConfig.email}`} />}
        >
          Contacto
        </Button>
      </div>
    </section>
  );
}
