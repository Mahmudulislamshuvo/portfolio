import { FaCalendarAlt as Calendar } from "react-icons/fa";
import experienceData from '../data/experience.json';

export const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white inline-block">
            Work{' '}
            <span className="text-cyan-400">
              Experience
            </span>
          </h2>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#111722] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-4 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-slate-800 self-start sm:self-auto">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3">
                {exp.highlights?.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141A26] border border-slate-800/80 text-xs text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
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
