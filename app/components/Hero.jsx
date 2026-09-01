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
} from "lucide-react";
import aboutData from "../data/about.json";

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
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 text-center text-white bg-black/40">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            >
              Hi, I am <span className="text-blue-500">{aboutData.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={!showVideoLayer ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-zinc-300 max-w-2xl mb-12"
            >
              {aboutData.role}
            </motion.p>

            <motion.a
              href="#about"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={!showVideoLayer ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors animate-bounce"
            >
              <ArrowDown size={24} />
            </motion.a>
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
