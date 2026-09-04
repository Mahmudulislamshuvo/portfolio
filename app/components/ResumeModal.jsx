"use client";
import React, { useEffect } from "react";
import { FaTimes as X, FaDownload as Download, FaFileAlt as FileText } from "react-icons/fa";

export const ResumeModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const element = document.createElement("a");
    element.href = "/Mahmudul_Islam_Resume.pdf";
    element.download = "Mahmudul_Islam_Resume.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-bg-card border border-border-subtle rounded-lg w-full max-w-lg p-6 sm:p-8 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary p-1.5 rounded-md hover:bg-bg-card-hover cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-md bg-bg-surface border border-border-subtle flex items-center justify-center text-accent-text">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              Frontend Developer Resume
            </h3>
            <p className="text-xs text-text-muted">
              Updated for 2026 · ATS Optimized & Verified
            </p>
          </div>
        </div>

        <div className="space-y-3 bg-bg-surface border border-border-subtle rounded-md p-4 text-xs text-text-secondary font-mono mb-6">
          <div className="flex justify-between py-1 border-b border-border-subtle/60">
            <span className="text-text-muted">Name:</span>
            <span className="text-text-primary font-semibold">Mahmudul Islam</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-subtle/60">
            <span className="text-text-muted">Role:</span>
            <span className="text-accent-text">Frontend / MERN Stack Developer</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-subtle/60">
            <span className="text-text-muted">Core Stack:</span>
            <span className="text-text-primary">React, Next.js, Node.js, MongoDB</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-text-muted">Location:</span>
            <span className="text-text-primary">Gazipur, Bangladesh</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 rounded-md text-xs sm:text-sm font-mono font-medium text-accent-foreground bg-accent hover:bg-accent-hover shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-md text-xs sm:text-sm font-mono font-medium text-text-muted hover:text-text-primary bg-bg-surface border border-border-subtle cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};




