import projectsData from "../../data/projects.json";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export default function ProjectDetail({ params }) {
  const project = projectsData.find((p) => p.id === params.id);

  if (!project) {
    return <div className="p-24 text-center">Project not found</div>;
  }

  return (
    <main className="min-h-screen pb-24 bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6 pt-24">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          
          <div className="flex items-center gap-4 text-xs font-medium tracking-widest text-blue-500 uppercase mb-4">
            <span>Case Study</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-zinc-500">Published 2023</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}: {project.description}</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            A high-performance, full-featured platform focusing on minimalist design and seamless user experience.
          </p>
        </div>

        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-16 relative">
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-zinc-200 dark:border-zinc-800 mb-16">
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Role</div>
            <div className="font-medium">{project.details.role}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Client</div>
            <div className="font-medium">{project.details.client}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Timeline</div>
            <div className="font-medium">{project.details.timeline}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Tech Stack</div>
            <div className="flex gap-2">
              {project.techStack.map(t => <span key={t} className="text-sm">{t}</span>)}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-red-500"></span> The Challenge
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{project.details.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-green-500"></span> The Solution
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{project.details.solution}</p>
          </div>
        </div>

        {project.details.features && project.details.features.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features Implemented</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {project.details.features.map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                  <h3 className="font-bold mb-2">{feature}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Core functionality that drives the platform performance and usability.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-12">Project Outcome</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.details.outcomes.map((outcome, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{outcome.value}</div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{outcome.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
