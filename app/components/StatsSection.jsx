import { getGithubCommits } from "../actions/github";
import aboutData from "../data/about.json";

export default async function StatsSection() {
  // Extract username from github URL
  const githubUrl = aboutData.socials?.github || "";
  const username = githubUrl.split("/").pop();

  // Fetch real-time commit count
  const commits = await getGithubCommits(username);

  // Update the stats dynamically
  const dynamicStats = aboutData.stats.map((stat) => {
    if (stat.label === "CODE COMMITS" && commits) {
      return { ...stat, value: `${commits}+` };
    }
    return stat;
  });

  return (
    <div className="grid grid-cols-2 gap-4 pt-2">
      {dynamicStats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-bg-card border border-border-subtle hover:border-border-strong rounded-lg p-5 text-center transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 group"
        >
          <div className="text-2xl sm:text-3xl font-extrabold text-text-primary font-mono tracking-tight group-hover:text-accent-text transition-colors">
            {stat.value}
          </div>
          <div className="text-[11px] font-semibold text-text-muted tracking-wider mt-1 uppercase font-mono">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-bg-card border border-border-subtle rounded-lg p-5 text-center flex flex-col items-center justify-center animate-pulse h-24.5"
        >
          <div className="h-7 sm:h-9 bg-bg-surface rounded w-16 mb-2"></div>
          <div className="h-3 bg-bg-surface rounded w-24"></div>
        </div>
      ))}
    </div>
  );
};




