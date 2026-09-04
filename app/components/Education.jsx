import { FaCalendarAlt as Calendar, FaGraduationCap as GraduationCap } from "react-icons/fa";
import educationData from '../data/education.json';

export const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary inline-block">
            Academic{' '}
            <span className="text-accent-text">
              Background
            </span>
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-border-subtle ml-4 sm:ml-6 md:ml-8 space-y-12">
          {educationData.map((edu) => (
            <div key={edu.id} className="relative pl-8 sm:pl-10 group">
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-bg-main border-2 border-border-strong group-hover:border-accent-text transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-border-strong group-hover:bg-accent-text transition-colors" />
              </div>

              <div className="bg-bg-card border border-border-subtle rounded-lg p-6 transition-all duration-300 hover:border-border-strong hover:shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent-text transition-colors flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-accent-text hidden sm:block" />
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-text-secondary mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-text-muted bg-bg-surface border border-border-subtle self-start">
                    <Calendar className="w-3 h-3 text-accent-text" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {edu.description}
                </p>

                {/* Highlights Badges */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle text-xs font-mono text-text-secondary group-hover:border-border-strong transition-colors"
                      >
                        {hl}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




