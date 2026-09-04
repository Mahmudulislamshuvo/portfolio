"use client";
import React, { useState, useEffect } from "react";
import { FaDownload as Download, FaBars as Menu, FaTimes as X } from "react-icons/fa";
import { ResumeModal } from "./ResumeModal";
import Image from "next/image";
import logo from "../../public/logo.png";

import { ThemeToggle } from "./ThemeToggle";

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
          ? "bg-bg-main/85 backdrop-blur-md border-b border-border-subtle py-3.5"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center text-center gap-x-1 font-bold text-lg group"
        >
          <span>
            <Image src={logo} alt="Logo" height={40} width={40} />
          </span>
          <span className={`tracking-tight font-semibold flex items-center gap-1.5 ${scrolled ? "text-text-primary" : "text-white"}`}>
            Mahmudul <span className="text-accent-text">Islam</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors duration-200 hover:text-accent-text ${
                activeSection === item.href.substring(1)
                  ? "text-accent-text font-semibold"
                  : scrolled
                    ? "text-text-muted hover:text-text-primary"
                    : "text-white font-medium hover:text-accent-text"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setResumeModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-accent-foreground bg-accent hover:bg-accent-hover rounded-md shadow-sm transition-all duration-200 active:scale-95 border border-accent cursor-pointer"
          >
            <span>Resume</span>
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-text-muted hover:text-text-primary hover:bg-bg-card-hover"
                : "text-text-primary hover:text-accent-text hover:bg-bg-card-hover"
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
        <div className="sm:hidden bg-bg-main/95 border-b border-border-subtle backdrop-blur-xl px-6 py-5 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-secondary hover:text-accent-text font-medium text-sm border-b border-border-subtle/40"
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
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-accent-foreground bg-accent hover:bg-accent-hover rounded-md"
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




