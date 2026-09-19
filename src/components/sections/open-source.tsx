import { getPinnedRepos } from "@/lib/github";
import { RepoCard } from "@/components/repo-card";

export async function OpenSource() {
  const repos = await getPinnedRepos();

  if (repos.length === 0) return null;

  return (
    <section id="open-source" className="mx-auto w-full max-w-2xl px-6 py-24">
      <h2 className="text-sm font-medium text-muted-foreground">
        Código abierto
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </section>
  );
}
