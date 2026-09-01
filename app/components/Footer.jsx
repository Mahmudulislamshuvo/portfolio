import React from "react";
import { ScrollToTopButton } from "./ScrollToTopButton";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080E] py-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-xs text-slate-500 text-center sm:text-left">
          © {new Date().getFullYear()} Mahmudul Islam's Portfolio. All rights
          reserved.
        </p>

        {/* Legal Links & Scroll Top */}
        <div className="flex items-center gap-6">
          <a
            href="#privacy"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Terms of Service
          </a>

          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
};
