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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0F141E] border border-slate-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Frontend Developer Resume
            </h3>
            <p className="text-xs text-slate-400">
              Updated for 2026 · ATS Optimized & Verified
            </p>
          </div>
        </div>

        <div className="space-y-3 bg-[#141A26] border border-slate-800 rounded-xl p-4 text-xs text-slate-300 font-mono mb-6">
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-500">Name:</span>
            <span className="text-white font-semibold">Mahmudul Islam</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-500">Role:</span>
            <span className="text-cyan-400">Frontend / MERN Stack Developer</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-500">Core Stack:</span>
            <span className="text-white">React, Next.js, Node.js, MongoDB</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Location:</span>
            <span className="text-white">Gazipur, Bangladesh</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
