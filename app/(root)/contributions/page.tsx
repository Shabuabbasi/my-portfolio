import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ContributionCard from "@/components/contributions/contribution-card";
import GithubCalendar from "@/components/contributions/github-calendar";
import { pagesConfig } from "@/config/pages";
import { getGitHubData } from "@/lib/github";

// GitHub data is fetched at request time and cached by the data client.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pagesConfig.contributions.metadata.title,
  description: pagesConfig.contributions.metadata.description,
};

export default async function ContributonsPage() {
  const github = await getGitHubData();
  const displayedRepositories = github.pinnedRepositories.length > 0
    ? github.pinnedRepositories
    : github.repositories;

  return (
    <PageContainer
      title={pagesConfig.contributions.title}
      description={pagesConfig.contributions.description}
    >
      <div className="space-y-6">
        <GithubCalendar username={github.username} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border bg-background p-4"><p className="text-2xl font-bold">{github.totalRepositories}</p><p className="text-sm text-muted-foreground">Public repositories</p></div>
          <div className="rounded-lg border bg-background p-4"><p className="text-2xl font-bold">{github.totalStars}</p><p className="text-sm text-muted-foreground">Stars received</p></div>
          <div className="rounded-lg border bg-background p-4"><p className="text-2xl font-bold">{github.pinnedRepositories.length}</p><p className="text-sm text-muted-foreground">Pinned repositories</p></div>
          <div className="rounded-lg border bg-background p-4"><p className="text-2xl font-bold">{github.languages.length}</p><p className="text-sm text-muted-foreground">Languages used</p></div>
        </div>

        {github.languages.length > 0 && (
          <div className="rounded-lg border bg-background p-4">
            <h2 className="mb-3 font-heading text-lg font-semibold">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {github.languages.slice(0, 10).map((language) => (
                <span key={language.name} className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{language.name}</span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-4 font-heading text-xl font-semibold">{github.pinnedRepositories.length > 0 ? "Pinned repositories" : "Recent repositories"}</h2>
          <ContributionCard contributions={displayedRepositories} />
        </div>

        {github.recentActivity.length > 0 && (
          <div className="rounded-lg border bg-background p-4">
            <h2 className="mb-3 font-heading text-lg font-semibold">Recent public activity</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {github.recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center justify-between gap-4">
                  <a className="truncate hover:text-foreground" href={`https://github.com/${activity.repo.name}`} target="_blank" rel="noreferrer">{activity.type.replace("Event", "")} · {activity.repo.name}</a>
                  <time className="shrink-0 text-xs">{new Date(activity.created_at).toLocaleDateString()}</time>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
