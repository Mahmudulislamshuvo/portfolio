import { Calendar, GraduationCap } from 'lucide-react';
import educationData from '../data/education.json';

export const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white inline-block">
            Academic{' '}
            <span className="text-cyan-400">
              Background
            </span>
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 md:ml-8 space-y-12">
          {educationData.map((edu) => (
            <div key={edu.id} className="relative pl-8 sm:pl-10 group">
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#080B11] border-2 border-slate-700 group-hover:border-cyan-400 transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors" />
              </div>

              <div className="bg-[#111722]/80 border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-slate-700 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-cyan-400 hidden sm:block" />
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-slate-800 self-start">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {edu.description}
                </p>

                {/* Highlights Badges */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2.5">
                    {edu.highlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1 rounded-md bg-[#161D2B] border border-slate-800 text-xs font-medium text-slate-300 group-hover:border-slate-700 transition-colors"
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
