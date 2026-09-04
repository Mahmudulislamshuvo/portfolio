"use client";
import React, { useState } from 'react';
import { FaExternalLinkAlt as ExternalLink, FaArrowRight as ArrowRight } from "react-icons/fa";
import Link from 'next/link';
import projectsData from '../data/projects.json';
import { GithubIcon } from './SocialIcons';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React/Next.js', 'UI/UX', 'Full-Stack'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Featured{' '}
              <span className="text-accent-text">
                Projects
              </span>
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-2">
              A selection of my recent works across different technologies.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-bg-surface border border-border-subtle self-start md:self-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-card-hover'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-bg-card border border-border-subtle hover:border-border-strong rounded-lg overflow-hidden transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 group flex flex-col justify-between"
            >
              <Link href={`/projects/${project.id}`} className="block focus:outline-none">
                <div className="relative h-48 overflow-hidden bg-bg-surface">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-bg-surface/90 text-accent-text border border-border-subtle backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-text transition-colors flex items-center justify-between">
                    {project.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-accent-text" />
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-text-secondary bg-bg-surface border border-border-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="px-6 pb-6 pt-2 flex items-center gap-4 border-t border-border-subtle mt-2">
                <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-secondary hover:text-accent-text transition-colors mr-auto">
                  <span>Details</span>
                </Link>
                
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-text hover:opacity-80 transition-colors"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {(project.links?.github || project.links?.githubClient) && (
                  <a
                    href={project.links.github || project.links.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text-primary transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




