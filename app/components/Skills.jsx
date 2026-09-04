import { FaCode as Code2, FaLayerGroup as Layers, FaTerminal as Terminal, FaDatabase as Database } from "react-icons/fa";
import skillsData from '../data/skills.json';

export const Skills = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
      case 'Code':
        return <Code2 className="w-5 h-5 text-accent-text" />;
      case 'Layers':
      case 'Layout':
        return <Layers className="w-5 h-5 text-accent-text" />;
      case 'Database':
        return <Database className="w-5 h-5 text-accent-text" />;
      case 'Wrench':
      case 'Terminal':
      default:
        return <Terminal className="w-5 h-5 text-accent-text" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary inline-block">
            Tech Stack &{' '}
            <span className="text-accent-text">
              Skills
            </span>
          </h2>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.categories.map((category) => (
            <div
              key={category.id}
              className="bg-bg-card border border-border-subtle hover:border-border-strong rounded-lg p-6 transition-all duration-300 hover:shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-bg-surface border border-border-subtle flex items-center justify-center group-hover:border-border-strong transition-colors">
                    {getIcon(category.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-text transition-colors">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {category.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono text-text-secondary bg-bg-surface border border-border-subtle hover:border-border-strong hover:text-text-primary transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>Proficiency: {category.proficiency || "Beginner"}</span>
                <span className="text-accent-text font-mono font-medium">{category.items.length} Technologies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




