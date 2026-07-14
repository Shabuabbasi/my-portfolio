import { siteConfig } from "@/config/site";

const API_URL = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60;

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  owner: { login: string };
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export interface GitHubActivity {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
}

export interface GitHubData {
  username: string;
  totalRepositories: number;
  totalStars: number;
  languages: { name: string; bytes: number }[];
  pinnedRepositories: GitHubRepository[];
  repositories: GitHubRepository[];
  recentActivity: GitHubActivity[];
}

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

async function getPinnedRepositories(username: string): Promise<GitHubRepository[]> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) return [];

  const query = `query PinnedRepositories($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes { ... on Repository { databaseId name description url stargazerCount forkCount primaryLanguage { name } updatedAt owner { login } isFork } }
      }
    }
  }`;
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...githubHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return [];
    const result = (await response.json()) as { data?: { user?: { pinnedItems?: { nodes?: Array<Record<string, unknown>> } } } };
    return (result.data?.user?.pinnedItems?.nodes ?? []).flatMap((repo) =>
      typeof repo.databaseId === "number" && typeof repo.name === "string" && typeof repo.url === "string"
        ? [{
            id: repo.databaseId,
            name: repo.name,
            description: typeof repo.description === "string" ? repo.description : null,
            html_url: repo.url,
            owner: { login: (repo.owner as { login?: string } | undefined)?.login ?? username },
            stargazers_count: typeof repo.stargazerCount === "number" ? repo.stargazerCount : 0,
            forks_count: typeof repo.forkCount === "number" ? repo.forkCount : 0,
            language: (repo.primaryLanguage as { name?: string } | undefined)?.name ?? null,
            updated_at: typeof repo.updatedAt === "string" ? repo.updatedAt : "",
            fork: repo.isFork === true,
          }]
        : []
    );
  } catch {
    return [];
  }
}

export async function getGitHubData(username = siteConfig.username): Promise<GitHubData> {
  const [profile, repositoryResponse, recentActivity, pinnedRepositories] = await Promise.all([
    githubFetch<{ public_repos: number }>(`/users/${username}`),
    githubFetch<GitHubRepository[]>(`/users/${username}/repos?type=owner&sort=updated&per_page=100`),
    githubFetch<GitHubActivity[]>(`/users/${username}/events/public?per_page=12`),
    getPinnedRepositories(username),
  ]);
  const repositories = (repositoryResponse ?? []).filter((repo) => !repo.fork);
  // Unauthenticated GitHub API requests are limited to 60/hour. A token allows
  // the full public repository set; without one we stay below that limit.
  const repositoriesForLanguages = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
    ? repositories
    : repositories.slice(0, 50);
  const languageEntries = await Promise.all(
    repositoriesForLanguages.map(async (repo) => [repo.name, await githubFetch<Record<string, number>>(`/repos/${username}/${repo.name}/languages`)] as const)
  );
  const languageTotals = new Map<string, number>();
  languageEntries.forEach(([, languages]) => {
    Object.entries(languages ?? {}).forEach(([name, bytes]) => languageTotals.set(name, (languageTotals.get(name) ?? 0) + bytes));
  });

  return {
    username,
    totalRepositories: profile?.public_repos ?? repositories.length,
    totalStars: repositories.reduce((total, repo) => total + repo.stargazers_count, 0),
    languages: Array.from(languageTotals.entries()).map(([name, bytes]) => ({ name, bytes })).sort((a, b) => b.bytes - a.bytes),
    pinnedRepositories,
    repositories: repositories.slice(0, 12),
    recentActivity: (recentActivity ?? []).slice(0, 8),
  };
}
