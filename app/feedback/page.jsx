"use client";

import { useState } from "react";
import { ArrowLeft, Star, Send } from "lucide-react";
import Link from "next/link";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 py-24">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Return to Portfolio
        </Link>
        
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Client Feedback</h1>
            <p className="text-zinc-500">Thank you for choosing to work with me. Your feedback helps me improve and helps others trust my work.</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name / Type</label>
                <input type="text" placeholder="E-commerce Website" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Live Website Link (Optional)</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-500 text-sm">https://</span>
                <input type="text" placeholder="yourwebsite.com" className="w-full px-4 py-3 rounded-r-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium mb-2 block">Choose an Avatar</label>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <button key={i} type="button" className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-colors">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar option" />
                  </button>
                ))}
                <button type="button" className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-colors">
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium mb-2 block">Overall Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      size={32} 
                      className={`${(hoveredRating || rating) >= star ? "text-yellow-500 fill-yellow-500" : "text-zinc-300 dark:text-zinc-700"}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your Experience</label>
              <textarea 
                placeholder="Share your thoughts about working with me..." 
                rows={5} 
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button type="button" className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              Submit My Review <Send size={18} />
            </button>

            <p className="text-center text-xs text-zinc-500 mt-4">
              By submitting, you agree to let this review be displayed on my portfolio website.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
