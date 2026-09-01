import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { INITIAL_REVIEWS } from "./data/portfolioData";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080B11] text-slate-300 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main>
        {/* WE PRESERVE THE ORIGINAL HERO */}
        <section id="home">
          <Hero />
        </section>
        
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Reviews reviews={INITIAL_REVIEWS} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
