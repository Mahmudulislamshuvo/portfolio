import { getGithubCommits } from '../actions/github';
import aboutData from '../data/about.json';

export default async function StatsSection() {
  // Extract username from github URL
  const githubUrl = aboutData.socials?.github || "";
  const username = githubUrl.split('/').pop();
  
  // Fetch real-time commit count
  const commits = await getGithubCommits(username);
  
  // Update the stats dynamically
  const dynamicStats = aboutData.stats.map(stat => {
    if (stat.label === 'CODE COMMITS' && commits) {
      return { ...stat, value: `${commits}+` };
    }
    return stat;
  });

  return (
    <div className="grid grid-cols-2 gap-4 pt-2">
      {dynamicStats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#111722] border border-slate-800/80 hover:border-slate-700 rounded-xl p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
        >
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            {stat.value}
          </div>
          <div className="text-[11px] font-semibold text-slate-400 tracking-wider mt-1 uppercase font-mono">
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
          className="bg-[#111722] border border-slate-800/80 rounded-xl p-5 text-center flex flex-col items-center justify-center animate-pulse h-[98px]"
        >
          <div className="h-7 sm:h-9 bg-slate-800 rounded w-16 mb-2"></div>
          <div className="h-3 bg-slate-800 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
};
