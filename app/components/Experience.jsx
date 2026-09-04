import { FaCalendarAlt as Calendar } from "react-icons/fa";
import experienceData from '../data/experience.json';

export const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary inline-block">
            Work{' '}
            <span className="text-accent-text">
              Experience
            </span>
          </h2>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="bg-bg-card border border-border-subtle hover:border-border-strong rounded-lg p-6 sm:p-7 transition-all duration-300 hover:shadow-sm group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent-text transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-accent-text mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-text-muted bg-bg-surface border border-border-subtle self-start sm:self-auto">
                  <Calendar className="w-3 h-3 text-accent-text" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-5">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2.5">
                {exp.highlights?.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-surface border border-border-subtle font-mono text-xs text-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-text" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




