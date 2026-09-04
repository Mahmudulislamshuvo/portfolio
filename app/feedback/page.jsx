"use client";

import { useState } from "react";
import { FaArrowLeft as ArrowLeft, FaStar as Star, FaPaperPlane as Send } from "react-icons/fa";
import Link from "next/link";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <main className="min-h-screen bg-bg-main text-text-secondary flex flex-col items-center justify-center p-6 py-24">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-medium text-text-muted hover:text-accent-text transition-colors mb-8">
          <ArrowLeft size={14} /> Return to Portfolio
        </Link>
        
        <div className="bg-bg-card rounded-lg p-8 md:p-12 shadow-sm border border-border-subtle">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-text-primary tracking-tight">Client Feedback</h1>
            <p className="text-text-muted text-sm">Thank you for choosing to work with me. Your feedback helps me improve and helps others trust my work.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary">Your Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-md bg-bg-main border border-border-subtle text-text-primary placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary">Project Name / Type</label>
                <input type="text" placeholder="E-commerce Website" className="w-full px-4 py-3 rounded-md bg-bg-main border border-border-subtle text-text-primary placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary">Live Website Link (Optional)</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-border-subtle bg-bg-surface text-text-muted font-mono text-xs">https://</span>
                <input type="text" placeholder="yourwebsite.com" className="w-full px-4 py-3 rounded-r-md bg-bg-main border border-border-subtle text-text-primary placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary block">Choose an Avatar</label>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <button key={i} type="button" className="w-11 h-11 rounded-full overflow-hidden border border-border-subtle hover:border-accent focus:border-accent transition-colors cursor-pointer">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar option" />
                  </button>
                ))}
                <button type="button" className="w-11 h-11 rounded-full border border-dashed border-border-strong flex items-center justify-center text-text-muted hover:text-accent-text hover:border-accent transition-colors cursor-pointer">
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary block">Overall Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star 
                      size={24} 
                      className={`${(hoveredRating || rating) >= star ? "text-accent-text fill-accent-text" : "text-border-strong"}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary">Your Experience</label>
              <textarea 
                placeholder="Share your thoughts about working with me..." 
                rows={5} 
                className="w-full px-4 py-3 rounded-md bg-bg-main border border-border-subtle text-text-primary placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              ></textarea>
            </div>

            <button type="button" className="w-full py-3.5 bg-accent hover:bg-accent-hover text-accent-foreground rounded-md font-mono text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
              Submit My Review <Send size={14} />
            </button>

            <p className="text-center text-[11px] text-text-muted mt-4 font-normal">
              By submitting, you agree to let this review be displayed on my portfolio website.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}




