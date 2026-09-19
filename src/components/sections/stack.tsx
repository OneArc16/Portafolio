import { stack } from "@/config/stack";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/section";

export function Stack() {
  return (
    <Section id="stack" title="Stack y herramientas">
      <dl className="grid gap-6 sm:grid-cols-2">
        {stack.map(({ category, items }) => (
          <div key={category}>
            <dt className="text-sm font-medium">{category}</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
