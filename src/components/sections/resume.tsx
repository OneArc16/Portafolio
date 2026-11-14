import { Briefcase, GraduationCap, type LucideIcon } from "lucide-react";
import { experience, education, type ResumeEntry } from "@/config/resume";
import { Section } from "@/components/layout/section";

function ResumeGroup({
  heading,
  icon: Icon,
  entries,
}: {
  heading: string;
  icon: LucideIcon;
  entries: ResumeEntry[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="relative z-10 flex size-8 items-center justify-center rounded-full border bg-background text-primary">
          <Icon className="size-4" />
        </span>
        <h3 className="text-sm font-medium">{heading}</h3>
      </div>
      <ul className="mt-4 space-y-4 pl-11">
        {entries.map((entry) => (
          <li
            key={`${entry.organization}-${entry.title}`}
            className="relative flex flex-col gap-1 rounded-2xl border bg-card/50 p-5 transition-all duration-300 hover:translate-x-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            {/* Centered on the rail: 1rem rail offset minus the 2.75rem
                list indent minus half the dot. */}
            <span
              aria-hidden
              className="absolute top-7 -left-[2.0625rem] flex size-2.5"
            >
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary ring-4 ring-background" />
            </span>
            <div>
              <p className="font-medium">{entry.title}</p>
              <p className="text-sm text-muted-foreground">
                {entry.organization}
                {entry.detail && ` · ${entry.detail}`}
              </p>
            </div>
            <p className="font-mono text-xs text-muted-foreground sm:shrink-0">
              {entry.period}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Resume() {
  return (
    <Section id="experiencia" title="Experiencia y educación">
      <div className="relative space-y-10">
        <span
          aria-hidden
          className="absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 bg-border"
        />
        <span
          aria-hidden
          className="timeline-fill absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 bg-linear-to-b from-primary via-sky-400 to-violet-500"
        />
        <ResumeGroup
          heading="Experiencia"
          icon={Briefcase}
          entries={experience}
        />
        <ResumeGroup
          heading="Educación"
          icon={GraduationCap}
          entries={education}
        />
      </div>
    </Section>
  );
}
