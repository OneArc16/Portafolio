import { siteConfig } from "@/config/site";

export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string } | null;
}

const query = `
  query ($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export async function getPinnedRepos(): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { login: siteConfig.githubUsername },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json.data?.user?.pinnedItems?.nodes ?? [];
}
