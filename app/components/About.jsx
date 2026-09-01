import { STATS } from '../data/portfolioData';

export const About = () => {
  return (
    <section id="about" className="py-16 relative">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>About</span>
                <span className="text-cyan-400">
                  Me
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                I am a passionate Frontend Developer dedicated to building high-performance,
                accessible, and beautiful web applications. My journey in tech started with a
                curiosity for how things work on the internet, which evolved into a career focused
                on React and modern web ecosystems.
              </p>
              <p>
                Beyond coding, I focus on UX principles to ensure that every pixel serves a purpose
                and every interaction feels intuitive. I believe in clean code, continuous learning,
                and pushing the boundaries of what's possible in the browser.
              </p>
            </div>

            {/* 4 Stat Cards (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {STATS.map((stat, idx) => (
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
          </div>

          {/* Right Column: Visual Setup Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0F141E] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
                  alt="Developer Desk Workspace Setup with Dual Glowing Monitors"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    SF Bay Area / Remote
                  </span>
                  <span className="text-slate-400">React & Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
