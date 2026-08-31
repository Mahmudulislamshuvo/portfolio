import expData from "../data/experience.json";

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Work <span className="text-blue-500">Experience</span></h2>
        <div className="space-y-12">
          {expData.map((job) => (
            <div key={job.id} className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
                <div className="mb-4 md:mb-0 md:text-right pt-1 text-sm font-medium text-zinc-500">
                  {job.period}
                </div>
                <div className="md:col-span-3 relative pb-12 border-l border-zinc-200 dark:border-zinc-800 md:pl-8 last:pb-0 last:border-0">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-2" />
                  <h3 className="text-xl font-bold">{job.role}</h3>
                  <div className="text-blue-500 mb-4">{job.company}</div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">{job.description}</p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                    {job.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
