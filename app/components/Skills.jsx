import { Code2, Layers, Terminal } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Wrench':
      default:
        return <Terminal className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white inline-block">
            Tech Stack &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 relative pb-1">
              Skills
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            </span>
          </h2>
        </div>

        {/* 3 Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="bg-[#0F141E]/95 border border-slate-800/90 hover:border-slate-700/90 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors shadow-inner">
                    {getIcon(category.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#161D2B]/80 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Proficiency: Senior</span>
                <span className="text-cyan-400/80">{category.skills.length} Technologies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
