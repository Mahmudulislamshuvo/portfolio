"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")} className="text-xl font-bold tracking-tighter">
          DEV<span className="text-blue-500">.PORTFOLIO</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
