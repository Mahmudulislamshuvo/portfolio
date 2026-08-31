"use client";

import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import aboutData from "../data/about.json";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Get In <span className="text-blue-500">Touch</span></h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-md">
            Have a project in mind or just want to chat? Feel free to reach out. I am always open to new opportunities and collaborations.
          </p>
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider text-zinc-500 uppercase">Email Me</div>
                <div className="font-medium">{aboutData.socials.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider text-zinc-500 uppercase">Based In</div>
                <div className="font-medium">{aboutData.location}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <a href={aboutData.socials.github} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <FaGithub size={18} />
            </a>
            <a href={aboutData.socials.linkedin} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href={aboutData.socials.twitter} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Email</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input type="text" placeholder="Project Inquiry" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea placeholder="How can I help you?" rows={4} className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            </div>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
