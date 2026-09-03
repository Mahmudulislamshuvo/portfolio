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
import reviewsData from "./data/reviews.json";

import { ScrollReveal } from "./components/ScrollReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080B11] text-slate-300 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main>
        {/* WE PRESERVE THE ORIGINAL HERO */}
        <section id="home">
          <Hero />
        </section>
        
        <ScrollReveal direction="left"><About /></ScrollReveal>
        <ScrollReveal direction="right"><Skills /></ScrollReveal>
        <ScrollReveal direction="left"><Projects /></ScrollReveal>
        <ScrollReveal direction="right"><Experience /></ScrollReveal>
        <ScrollReveal direction="left"><Education /></ScrollReveal>
        <ScrollReveal direction="right"><Reviews reviews={reviewsData} /></ScrollReveal>
        <ScrollReveal direction="up"><Contact /></ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
