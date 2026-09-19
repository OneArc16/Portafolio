import { getPinnedRepos } from "@/lib/github";
import { RepoCard } from "@/components/repo-card";
import { Section } from "@/components/layout/section";

export async function OpenSource() {
  const repos = await getPinnedRepos();

  if (repos.length === 0) return null;

  return (
    <Section id="open-source" title="Código abierto">
      <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 py-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:py-0">
        {repos.map((repo) => (
          <li key={repo.name} className="w-[85%] shrink-0 snap-start sm:w-auto">
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
