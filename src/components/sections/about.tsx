import { Section } from "@/components/layout/section";
import { CountUp } from "@/components/count-up";

const stats = [
  { value: 5, prefix: "+", label: "años en el sector salud" },
  { value: 3, prefix: "+", label: "años desarrollando con React" },
  { value: 8, suffix: "vo", label: "semestre de Ingeniería de Sistemas" },
];

export function About() {
  return (
    <Section id="sobre-mi" title="Sobre mí">
      <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
        <p>
          Llevo 5 años trabajando en una empresa del sector salud, donde empecé
          como técnico y con el tiempo me fui enfocando en desarrollo. Desde
          hace 3 años programo con React, Next.js, Angular, Vue y Vite, y en
          cada proyecto le pongo especial atención al UI/UX: que la interfaz no
          solo funcione, sino que se sienta bien de usar.
        </p>
        <p>
          Actualmente curso 8vo semestre de Ingeniería en Sistemas y sigo
          estudiando de forma constante para mejorar la calidad de lo que
          entrego.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map(({ value, prefix, suffix, label }) => (
          <li
            key={label}
            className="group relative overflow-hidden rounded-2xl border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-primary/15 blur-2xl transition-transform duration-500 group-hover:scale-150"
            />
            <p className="relative bg-linear-to-br from-foreground to-primary bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl dark:to-sky-300">
              {prefix}
              <CountUp value={value} />
              {suffix}
            </p>
            <p className="relative mt-2 text-sm text-muted-foreground">
              {label}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
