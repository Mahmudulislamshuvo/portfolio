import projectsData from "../data/projects.json";

export function Projects() {
  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured <span className="text-blue-500">Projects</span></h2>
          <p className="text-zinc-500">A selection of my recent works across different technologies.</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <a key={project.id} href={`/projects/${project.id}`} className="group block">
            <div className="relative h-80 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-6">
              <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{project.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span key={i} className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-md text-zinc-600 dark:text-zinc-400">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
