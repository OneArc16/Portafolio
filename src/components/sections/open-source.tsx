import { getPinnedRepos } from "@/lib/github";
import { RepoCard } from "@/components/repo-card";
import { Section } from "@/components/layout/section";

export async function OpenSource() {
  const repos = await getPinnedRepos();

  if (repos.length === 0) return null;

  return (
    <Section id="open-source" title="Código abierto">
      <div className="grid gap-4 sm:grid-cols-2">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </Section>
  );
}
