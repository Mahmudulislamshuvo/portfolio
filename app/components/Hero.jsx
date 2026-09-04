"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown as ArrowDown, FaVolumeUp as Volume2, FaVolumeMute as VolumeX, FaStepForward as SkipForward, FaUndo as RotateCcw, FaEnvelope as Mail } from "react-icons/fa";
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
  const [isInitialized, setIsInitialized] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("introSeen");
    if (seen === "true") {
      setIsSkipped(true);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized && videoRef.current && isVideoValid && !isSkipped && !isEnded) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay is totally blocked
        setIsVideoValid(false);
      });
    }
  }, [isVideoValid, isSkipped, isEnded, isInitialized]);

  const handleVideoError = () => {
    setIsVideoValid(false);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    sessionStorage.setItem("introSeen", "true");
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReplay = () => {
    setIsEnded(false);
    setIsSkipped(false);
    sessionStorage.removeItem("introSeen");
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleEnded = () => {
    setIsEnded(true);
    sessionStorage.setItem("introSeen", "true");
  };

  const showVideoLayer = isInitialized && isVideoValid && !isSkipped && !isEnded;

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
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 text-center text-text-primary bg-hero-overlay transition-colors duration-500">
            {/* Available for work badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-md border border-border-subtle bg-bg-card/85 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="inline-flex rounded-full h-2 w-2 bg-accent-text"></span>
              </span>
              <span className="text-[11px] font-mono font-medium text-accent-text tracking-wider uppercase">
                Available for work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Hi, I am <span className="text-[#A7F3D0]">{aboutData.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl font-medium text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] max-w-2xl mb-12"
            >
              {aboutData.role}
            </motion.p>

            <motion.a
              href="#about"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={!showVideoLayer ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-3 rounded-md border border-border-subtle hover:border-accent-text transition-colors mt-4 text-text-muted hover:text-accent-text cursor-pointer"
            >
              <ArrowDown size={20} />
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
                  className="w-9 h-9 rounded-md bg-bg-card/85 backdrop-blur-md border border-border-subtle hover:border-accent-text text-text-muted hover:text-accent-text flex items-center justify-center transition-all duration-200"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
              <div className="w-px h-12 bg-border-subtle mx-auto mt-2 hidden md:block"></div>
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
                className="flex items-center gap-2 px-3.5 py-1.5 bg-bg-card/85 hover:bg-bg-card border border-border-subtle backdrop-blur-md rounded-md text-text-primary transition-colors font-mono text-xs cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX size={16} />
                    Unmute
                  </>
                ) : (
                  <>
                    <Volume2 size={16} />
                    Mute
                  </>
                )}
              </button>
            </div>

            {/* Skip Button - Bottom Center */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30 px-6">
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-5 py-2.5 bg-bg-card/85 hover:bg-bg-card border border-border-subtle backdrop-blur-md rounded-md text-text-primary transition-colors font-mono text-xs tracking-wider uppercase cursor-pointer"
              >
                Skip Intro
                <SkipForward size={16} />
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
              className="flex items-center gap-2 px-4 py-2 bg-bg-card/85 hover:bg-bg-card border border-border-subtle backdrop-blur-md rounded-md text-text-primary transition-colors font-mono text-xs cursor-pointer"
              title="Replay Intro"
            >
              <RotateCcw size={14} />
              Replay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}





