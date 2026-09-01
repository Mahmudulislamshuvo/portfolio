"use client";
import { useState, useEffect } from "react";
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
import { ReviewFormView } from "./components/ReviewFormView";
import { ResumeModal } from "./components/ResumeModal";
import { INITIAL_REVIEWS } from "./data/portfolioData";

export default function Home() {
  const [currentView, setCurrentView] = useState('portfolio');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [reviews, setReviews] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_reviews');
        return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
      } catch {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_reviews', JSON.stringify(reviews));
      } catch (e) {
        console.error('Could not save to localStorage', e);
      }
    }
  }, [reviews]);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (currentView === 'review-form') {
    return (
      <ReviewFormView
        onBack={() => navigateTo('portfolio')}
        onSubmitReview={handleAddReview}
      />
    );
  }

  return (
    <div id="home" className="min-h-screen bg-[#080B11] text-slate-300 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar
        onOpenReview={() => navigateTo('review-form')}
        onResumeClick={() => setResumeModalOpen(true)}
      />

      <main>
        {/* WE PRESERVE THE ORIGINAL HERO */}
        <Hero />
        
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Reviews
          reviews={reviews}
          onWriteReview={() => navigateTo('review-form')}
        />
        <Contact />
      </main>

      <Footer />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
