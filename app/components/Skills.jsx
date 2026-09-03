import { FaCode as Code2, FaLayerGroup as Layers, FaTerminal as Terminal, FaDatabase as Database } from "react-icons/fa";
import skillsData from '../data/skills.json';

export const Skills = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
      case 'Code':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Layers':
      case 'Layout':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Wrench':
      case 'Terminal':
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
            <span className="text-cyan-400 relative pb-1">
              Skills
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 rounded-full" />
            </span>
          </h2>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.categories.map((category) => (
            <div
              key={category.id}
              className="bg-[#111722] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#141A26] border border-slate-800 flex items-center justify-center group-hover:border-slate-600 transition-colors shadow-inner">
                    {getIcon(category.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {category.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#161D2B] border border-slate-800 hover:border-slate-600 hover:text-white transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Proficiency: {category.proficiency || "Beginner"}</span>
                <span className="text-cyan-400/80">{category.items.length} Technologies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
