import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="reveal mx-auto w-full max-w-3xl scroll-mt-20 px-6 py-20 sm:py-24"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
        />
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
