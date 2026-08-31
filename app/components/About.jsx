import aboutData from "../data/about.json";

export function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">About <span className="text-blue-500">Me</span></h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {aboutData.bio}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {aboutData.stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center hover:border-blue-500/50 transition-colors">
              <div className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
