import { Calendar, GraduationCap } from 'lucide-react';
import educationData from '../data/education.json';

export const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white inline-block">
            Education{' '}
            <span className="text-cyan-400">
              Education
            </span>
          </h2>
        </div>

        {/* Education Cards Stack */}
        <div className="space-y-6">
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className="bg-[#111722] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-4 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">
                    {edu.institution}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-slate-800 self-start sm:self-auto">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{edu.period}</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {edu.description}
              </p>

              {/* Highlights Badges */}
              {edu.highlights && edu.highlights.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {edu.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141A26] border border-slate-800/80 text-xs text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
