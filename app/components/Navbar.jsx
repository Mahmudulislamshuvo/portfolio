"use client";
import React, { useState, useEffect } from "react";
import { FaDownload as Download, FaBars as Menu, FaTimes as X } from "react-icons/fa";
import { ResumeModal } from "./ResumeModal";
import Image from "next/image";
import logo from "../../public/logo.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "education",
        "reviews",
        "contact",
      ];

      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300) {
            current = section;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    // Run immediately on mount
    handleScroll();
    
    // Run again shortly after to catch browser scroll restoration
    const timeoutId = setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080B11]/85 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-2xl shadow-black/50"
          : "bg-linear-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center text-center gap-x-1 text-white font-bold text-lg group"
        >
          <span>
            <Image src={logo} alt="Logo" height={40} width={40} />
          </span>
          <span className="tracking-tight text-slate-100 font-semibold flex items-center gap-1.5 drop-shadow-md">
            Mahmudul <span className="text-cyan-400">Islam</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors duration-200 hover:text-cyan-400 drop-shadow-md ${
                activeSection === item.href.substring(1)
                  ? "text-cyan-400 font-semibold"
                  : scrolled
                    ? "text-slate-400"
                    : "text-white font-medium"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setResumeModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-full shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-95 border border-indigo-400/30 cursor-pointer"
          >
            <span>Resume</span>
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-slate-400 hover:text-white hover:bg-slate-800/60"
                : "text-white hover:text-slate-200 hover:bg-white/20"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0B0F17]/95 border-b border-slate-800 backdrop-blur-xl px-6 py-5 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-cyan-400 font-medium text-sm border-b border-slate-800/40"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setResumeModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full"
            >
              <span>Download Resume</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </header>
  );
};
