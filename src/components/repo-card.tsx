import { Star } from "lucide-react";
import type { PinnedRepo } from "@/lib/github";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Spotlight } from "@/components/spotlight";

export function RepoCard({ repo }: { repo: PinnedRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Spotlight className="h-full transition-transform duration-300 group-hover:-translate-y-1">
        <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:ring-primary/50">
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
              <Star className="size-3 transition-colors group-hover:fill-amber-400 group-hover:text-amber-400" />
              {repo.stargazerCount}
            </span>
          </CardContent>
        </Card>
      </Spotlight>
    </a>
  );
}
