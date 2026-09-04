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
      className="w-8 h-8 rounded-md bg-bg-surface border border-border-subtle hover:border-accent-text text-text-muted hover:text-accent-text flex items-center justify-center transition-all duration-200 cursor-pointer"
    >
      <ArrowUp className="w-3.5 h-3.5" />
    </button>
  );
};




