import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Reviews />
      <Contact />
      <footer className="py-8 text-center text-zinc-500 text-sm border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 Frontend Developer Portfolio. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
