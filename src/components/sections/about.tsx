import { Section } from "@/components/layout/section";

export function About() {
  return (
    <Section id="sobre-mi" title="Sobre mí">
      <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
        <p>
          Llevo 5 años trabajando en una empresa del sector salud, donde
          empecé como técnico y con el tiempo me fui enfocando en
          desarrollo. Desde hace 3 años programo con React, Next.js,
          Angular, Vue y Vite, y en cada proyecto le pongo especial
          atención al UI/UX: que la interfaz no solo funcione, sino que se
          sienta bien de usar.
        </p>
        <p>
          Actualmente curso 8vo semestre de Ingeniería en Sistemas y sigo
          estudiando de forma constante para mejorar la calidad de lo que
          entrego.
        </p>
      </div>
    </Section>
  );
}
