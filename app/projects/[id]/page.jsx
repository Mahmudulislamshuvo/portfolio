import projectsData from "../../data/projects.json";
import { FaArrowLeft as ArrowLeft, FaExternalLinkAlt as ExternalLink, FaGithub as Github, FaGlobe as Globe } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image"; // optional, but standard img tag is fine since we use external urls without next.config.js setup

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export default function ProjectDetail({ params }) {
  const project = projectsData.find((p) => p.id === params.id);

  if (!project) {
    return <div className="p-24 text-center text-zinc-500">Project not found</div>;
  }

  // Destructuring for easier access, with default empty object
  const details = project.details || {};
  const links = project.links || {};

  return (
    <main className="min-h-screen pb-16 bg-[#080B11] text-slate-300 selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-widest text-cyan-400 uppercase mb-3">
            <span>Case Study</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-500">{project.category || "Project"}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white tracking-tight">{project.title}</h1>
          {project.description && (
            <p className="text-lg text-slate-400 max-w-3xl mb-6 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Action Links (Live / Github) */}
          {(links.live || links.githubClient || links.githubServer || links.github) && (
            <div className="flex flex-wrap gap-3">
              {links.live && (
                <a href={links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-md shadow-indigo-500/20 text-white rounded-lg font-medium transition-all duration-300 active:scale-[0.98] text-sm">
                  <Globe size={16} /> Live Demo
                </a>
              )}
              {(links.github || links.githubClient) && (
                <a href={links.github || links.githubClient} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111722] hover:bg-slate-800 border border-slate-800 text-white rounded-lg font-medium transition-all duration-300 active:scale-[0.98] text-sm">
                  <Github size={16} /> {links.githubClient && links.githubServer ? "GitHub (Client)" : "Source Code"}
                </a>
              )}
              {links.githubServer && (
                <a href={links.githubServer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111722] hover:bg-slate-800 border border-slate-800 text-white rounded-lg font-medium transition-all duration-300 active:scale-[0.98] text-sm">
                  <Github size={16} /> GitHub (Server)
                </a>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#111722] border border-slate-800/80 mb-10 relative shadow-xl shadow-black/40">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Project Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-800/60 mb-12">
          {details.role && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Role</div>
              <div className="font-medium text-slate-200 text-sm md:text-base">{details.role}</div>
            </div>
          )}
          {details.client && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Client</div>
              <div className="font-medium text-slate-200 text-sm md:text-base">{details.client}</div>
            </div>
          )}
          {details.timeline && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Timeline</div>
              <div className="font-medium text-slate-200 text-sm md:text-base">{details.timeline}</div>
            </div>
          )}
          {project.techStack && project.techStack.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map(t => <span key={t} className="px-2 py-1 rounded text-[10px] font-mono text-slate-300 bg-[#161D2B] border border-slate-800">{t}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* Challenge & Solution */}
        {(details.challenge || details.solution) && (
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {details.challenge && (
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2.5 text-white">
                  <span className="w-5 h-[2px] bg-red-500/80"></span> The Challenge
                </h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed whitespace-pre-wrap">{details.challenge}</p>
              </div>
            )}
            {details.solution && (
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2.5 text-white">
                  <span className="w-5 h-[2px] bg-emerald-500/80"></span> The Solution
                </h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed whitespace-pre-wrap">{details.solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Key Features */}
        {details.features && details.features.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
               <span className="w-6 h-[2px] bg-cyan-500/80"></span> Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {details.features.map((feature, i) => (
                <div key={i} className="p-5 rounded-xl bg-[#111722] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group">
                  <h3 className="text-sm md:text-base font-bold mb-1.5 text-slate-200 group-hover:text-cyan-400 transition-colors">{feature.title || feature}</h3>
                  {feature.description && (
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Screenshots Gallery */}
        {details.screenshots && details.screenshots.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-6 h-[2px] bg-cyan-500/80"></span> Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.screenshots.map((imgUrl, idx) => (
                <div key={idx} className="w-full aspect-video rounded-xl overflow-hidden bg-[#111722] relative border border-slate-800/80 shadow-md group">
                  <img src={imgUrl} alt={`${project.title} screenshot ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F141E] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Outcomes */}
        {details.outcomes && details.outcomes.length > 0 && (
          <div className="bg-[#141A26] border border-slate-800/80 rounded-2xl p-8 text-center shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <h2 className="text-xl font-bold mb-8 text-white">Project Outcome</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {details.outcomes.map((outcome, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1.5 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">{outcome.value}</div>
                  <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">{outcome.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
