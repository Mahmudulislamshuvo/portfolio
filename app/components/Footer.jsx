"use client";
import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080E] py-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-xs text-slate-500 text-center sm:text-left">
          © 2026 Frontend Developer Portfolio. All rights reserved.
        </p>

        {/* Legal Links & Scroll Top */}
        <div className="flex items-center gap-6">
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('Privacy Policy: All information submitted via reviews or contact is handled confidentially and displayed only upon explicit submission.');
            }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            onClick={(e) => {
              e.preventDefault();
              alert('Terms of Service: Standard portfolio demonstration and client review showcase terms.');
            }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Terms of Service
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-200"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
