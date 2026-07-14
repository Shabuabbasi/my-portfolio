"use client";

import { GitHubCalendar } from "react-github-calendar";

export default function GithubCalendar({ username }: { username: string }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-background p-4">
      <GitHubCalendar username={username} colorScheme="light" fontSize={12} blockSize={12} blockMargin={4} />
    </div>
  );
}
