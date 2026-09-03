"use client";
import { FaArrowUp as ArrowUp } from "react-icons/fa";

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-200"
    >
      <ArrowUp className="w-3.5 h-3.5" />
    </button>
  );
};
