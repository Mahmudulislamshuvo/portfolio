import skillsData from "../data/skills.json";
import { Code, Layout, Terminal } from "lucide-react";

const icons = { Code, Layout, Terminal };

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Tech Stack & <span className="text-blue-500">Skills</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.categories.map((cat, i) => {
            const Icon = icons[cat.icon] || Code;
            return (
              <div key={i} className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-6">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, j) => (
                    <span key={j} className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
