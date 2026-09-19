import { experience, education, type ResumeEntry } from "@/config/resume";
import { Section } from "@/components/layout/section";

function ResumeGroup({
  heading,
  entries,
}: {
  heading: string;
  entries: ResumeEntry[];
}) {
  return (
    <div>
      <h3 className="text-sm font-medium">{heading}</h3>
      <ul className="mt-3 space-y-4">
        {entries.map((entry) => (
          <li
            key={`${entry.organization}-${entry.title}`}
            className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-medium">{entry.title}</p>
              <p className="text-sm text-muted-foreground">
                {entry.organization}
                {entry.detail && ` · ${entry.detail}`}
              </p>
            </div>
            <p className="text-sm text-muted-foreground sm:shrink-0">
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
      <div className="mt-6 space-y-8">
        <ResumeGroup heading="Experiencia" entries={experience} />
        <ResumeGroup heading="Educación" entries={education} />
      </div>
    </Section>
  );
}
