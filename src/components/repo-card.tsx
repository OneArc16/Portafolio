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
      className="block"
    >
      <Card className="h-full transition-colors hover:bg-muted/50">
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
