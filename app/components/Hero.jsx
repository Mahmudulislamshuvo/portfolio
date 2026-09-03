"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Volume2,
  VolumeX,
  SkipForward,
  RotateCcw,
  Mail,
} from "lucide-react";
import aboutData from "../data/about.json";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "./SocialIcons";

// react-water-wave uses window/document, so disable SSR
const WaterWave = dynamic(() => import("react-water-wave"), { ssr: false });

export function Hero() {
  const [isVideoValid, setIsVideoValid] = useState(true);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted for autoplay policies

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && isVideoValid && !isSkipped && !isEnded) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay is totally blocked
        setIsVideoValid(false);
      });
    }
  }, [isVideoValid, isSkipped, isEnded]);

  const handleVideoError = () => {
    setIsVideoValid(false);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReplay = () => {
    setIsEnded(false);
    setIsSkipped(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleEnded = () => {
    setIsEnded(true);
  };

  const showVideoLayer = isVideoValid && !isSkipped && !isEnded;

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-zinc-950"
    >
      {/* 1. Base Layer: Water Ripple Effect */}
      <WaterWave
        imageUrl="/hero-bg.jpg" // Optional: background image
        dropRadius={20}
        perturbance={0.03}
        resolution={256}
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#000",
        }}
      >
        {() => (
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 text-center text-white bg-black/30">
            {/* Available for work badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-black/40 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-medium text-emerald-400 tracking-wider uppercase">
                Available for work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg"
            >
              Hi, I am <span className="text-cyan-400 drop-shadow-md">{aboutData.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl font-bold text-slate-200 max-w-2xl mb-12"
            >
              {aboutData.role}
            </motion.p>

            <motion.a
              href="#about"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={!showVideoLayer ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors animate-bounce mt-4 text-white/70 hover:text-white"
            >
              <ArrowDown size={22} />
            </motion.a>

            {/* Social Icons (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={!showVideoLayer ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute left-4 md:left-8 bottom-12 flex flex-col gap-4 z-30"
            >
              {[
                {
                  icon: GithubIcon,
                  href: "https://github.com/Mahmudulislamshuvo",
                  label: "GitHub",
                },
                {
                  icon: LinkedinIcon,
                  href: "https://www.linkedin.com/in/mahmudul-islam-shuvo/",
                  label: "LinkedIn",
                },
                {
                  icon: FacebookIcon,
                  href: "https://www.facebook.com/mahmudulislamshuvo.bd/",
                  label: "Facebook",
                },
                {
                  icon: Mail,
                  href: "mailto:mahmudulislammern@gmail.com",
                  label: "Email",
                },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
              <div className="w-px h-12 bg-white/10 mx-auto mt-2 hidden md:block"></div>
            </motion.div>
          </div>
        )}
      </WaterWave>

      {/* 2. Top Layer: Intro Video Overlay */}
      <AnimatePresence>
        {showVideoLayer && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="absolute inset-0 z-20 bg-black"
          >
            <video
              ref={videoRef}
              src="/Intro.mp4"
              className="w-full h-full object-cover opacity-80"
              playsInline
              muted={isMuted}
              onError={handleVideoError}
              onEnded={handleEnded}
            />

            {/* Dark gradient for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Mute Button - Top Right */}
            <div className="absolute top-24 right-6 z-30">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors font-medium text-sm"
              >
                {isMuted ? (
                  <>
                    <VolumeX size={18} />
                    Unmute
                  </>
                ) : (
                  <>
                    <Volume2 size={18} />
                    Mute
                  </>
                )}
              </button>
            </div>

            {/* Skip Button - Bottom Center */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30 px-6">
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors font-medium tracking-wide"
              >
                Skip Intro
                <SkipForward size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Replay Button when video is skipped or ended */}
      <AnimatePresence>
        {(isSkipped || isEnded) && isVideoValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-12 right-6 z-30"
          >
            <button
              onClick={handleReplay}
              className="flex items-center gap-2 px-4 py-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white border border-white/10 transition-colors font-medium text-sm"
              title="Replay Intro"
            >
              <RotateCcw size={16} />
              Replay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
