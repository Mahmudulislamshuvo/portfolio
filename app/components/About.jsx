import { Suspense } from 'react';
import aboutData from '../data/about.json';
import StatsSection, { StatsSkeleton } from './StatsSection';
import Image from 'next/image';
import MyImage from "../../public/my.jpg"

export const About = () => {
  return (
    <section id="about" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch">
          {/* Left Column: Text & Stats */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center order-last lg:order-first">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary flex items-center gap-3">
                <span>About</span>
                <span className="text-accent-text">
                  Me
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed font-normal">
              <p>
                {aboutData.bio}
              </p>
              <p>
                For me, coding is all about solving real problems and making sure people actually enjoy using the websites I build. I prefer writing clean code, learning new tools, and keeping things simple but highly effective.
              </p>
            </div>

            {/* 4 Stat Cards (2x2 Grid) */}
            <Suspense fallback={<StatsSkeleton />}>
              <StatsSection />
            </Suspense>
          </div>

          {/* Right Column: Visual Setup Photo */}
          <div className="lg:col-span-5 flex order-first lg:order-last">
            <div className="relative group w-full h-full max-w-md mx-auto lg:max-w-none">
              <div className="relative rounded-lg overflow-hidden border border-border-subtle bg-bg-card shadow-sm h-full">
                <Image
                  src={MyImage}
                  alt="Developer Desk Workspace Setup with Dual Glowing Monitors"
                  className="w-full h-80 sm:h-96 lg:h-full lg:absolute lg:inset-0 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-bg-surface/90 backdrop-blur-md rounded-md border border-border-subtle flex items-center justify-between text-xs font-mono">
                  <span className="text-accent-text flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-text" />
                    {aboutData.location}
                  </span>
                  <span className="text-text-muted">React & Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




