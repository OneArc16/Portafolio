import { Star } from "lucide-react";
import type { PinnedRepo } from "@/lib/github";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function RepoCard({ repo }: { repo: PinnedRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Card className="h-full transition-all duration-200 group-hover:ring-primary/50 group-hover:bg-card/80 group-hover:-translate-y-0.5">
        <CardHeader>
          <CardTitle>{repo.name}</CardTitle>
          {repo.description && (
            <CardDescription>{repo.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex items-center gap-3 text-xs text-muted-foreground">
          {repo.primaryLanguage && (
            <span className="inline-flex items-center gap-1">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: repo.primaryLanguage.color }}
              />
              {repo.primaryLanguage.name}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" />
            {repo.stargazerCount}
          </span>
        </CardContent>
      </Card>
    </a>
  );
}
