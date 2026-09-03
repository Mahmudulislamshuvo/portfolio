"use client";
import React, { useState, useEffect } from "react";
import { FaEnvelope as Mail, FaMapMarkerAlt as MapPin, FaPaperPlane as Send, FaCheckCircle as CheckCircle2, FaCalendarAlt as Calendar, FaClock as Clock, FaUser as User, FaSpinner as Loader2, FaArrowRight as ArrowRight, FaArrowLeft as ArrowLeft } from "react-icons/fa";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "./SocialIcons";
import { motion, AnimatePresence } from "framer-motion";
import { addDays, format, getDay } from "date-fns";

export const Contact = () => {
  const [activeTab, setActiveTab] = useState("meeting"); // "message" or "meeting"
  const [bookingStep, setBookingStep] = useState(1); // 1 = Date/Time, 2 = Details Form

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Generate next 14 available days (skipping Fridays - getDay() === 5)
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    const days = [];
    let d = new Date();
    while (days.length < 14) {
      if (d.getDay() !== 5) {
        // Skip Friday
        days.push(new Date(d));
      }
      d = addDays(d, 1);
    }
    setAvailableDays(days);
  }, []);

  const [bookingDate, setBookingDate] = useState(null); // Date object
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [dateError, setDateError] = useState("");

  const [sent, setSent] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleDateSelect = async (dateObj) => {
    setBookingDate(dateObj);
    setSelectedSlot(null);
    setDateError("");
    setAvailableSlots([]);

    const dateStr = format(dateObj, "yyyy-MM-dd");
    setLoadingSlots(true);

    try {
      const res = await fetch(`/api/availability?date=${dateStr}`);
      const data = await res.json();
      if (data.slots) {
        setAvailableSlots(data.slots);
      } else {
        setAvailableSlots([]);
      }
    } catch (err) {
      console.error(err);
      setDateError("Failed to load availability.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatusMsg("Please fill out all required fields.");
      setSent(false);
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");

    try {
      const payload = {
        name: formState.name,
        email: formState.email,
        subject:
          activeTab === "meeting" ? "Meeting Request" : formState.subject,
        message: formState.message,
        timeSlot: activeTab === "meeting" ? selectedSlot : null,
      };

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        if (activeTab === "meeting") {
          setBookingStep(3);
        } else {
          setStatusMsg(
            "Your request has been sent successfully! I will get back to you shortly.",
          );
        }

        setTimeout(() => {
          setFormState({ name: "", email: "", subject: "", message: "" });
          setBookingDate(null);
          setSelectedSlot(null);
          setAvailableSlots([]);
          setBookingStep(1);
          setSent(false);
          setStatusMsg("");
        }, 5000);
      } else {
        setSent(false);
        setStatusMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSent(false);
      setStatusMsg("Failed to send request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Get In <span className="text-cyan-400">Touch</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
                Have a project in mind or just want to chat? Feel free to reach
                out or book a direct meeting with me. I'm always open to new
                opportunities.
              </p>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    EMAIL ME
                  </div>
                  <a
                    href="mailto:mahmudulislammern@gmail.com"
                    className="text-white text-sm font-medium hover:text-cyan-400 transition-colors"
                  >
                    mahmudulislammern@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    BASED IN
                  </div>
                  <div className="text-white text-sm font-medium">
                    Gazipur, Bangladesh
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    AVAILABILITY
                  </div>
                  <div className="text-white text-sm font-medium">
                    10:00 AM - 3:00 AM (GMT+6)
                  </div>
                  <div className="text-slate-400 text-xs">
                    Saturday - Thursday (Friday Off)
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="pt-2 flex items-center gap-3">
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
                  className="w-10 h-10 rounded-xl bg-[#111722] border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:shadow-md cursor-pointer"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form / Booking */}
          <div className="lg:col-span-7 relative overflow-hidden">
            <div className="bg-[#141A26] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg min-h-[500px] flex flex-col">
              {/* Tabs */}
              <div className="flex items-center gap-2 mb-8 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800/50">
                <button
                  onClick={() => {
                    setActiveTab("meeting");
                    setStatusMsg("");
                    setBookingStep(1);
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === "meeting"
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700/50"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Book Meeting
                </button>
                <button
                  onClick={() => {
                    setActiveTab("message");
                    setStatusMsg("");
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === "message"
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700/50"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>

              {statusMsg && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 mb-6 ${
                    sent
                      ? "bg-emerald-950/60 border border-emerald-800/80 text-emerald-300"
                      : "bg-red-950/60 border border-red-800/80 text-red-300"
                  }`}
                >
                  {sent && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  <span>{statusMsg}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* -------------------- GENERAL MESSAGE FORM -------------------- */}
                {activeTab === "message" && (
                  <motion.form
                    key="message-form"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleSubmit}
                    className="space-y-5 flex-1"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="How can I help you?"
                        required
                        className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer ${
                        isSubmitting
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50"
                      }`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                    </button>
                  </motion.form>
                )}

                {/* -------------------- BOOKING: STEP 1 (DATE & TIME) -------------------- */}
                {activeTab === "meeting" && bookingStep === 1 && (
                  <motion.div
                    key="booking-step-1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1 flex flex-col"
                  >
                    <div className="mb-4">
                      <h3 className="text-white font-semibold text-sm mb-1">
                        Select a Date
                      </h3>
                      <p className="text-slate-400 text-xs">
                        Choose an available day for our meeting.
                      </p>
                    </div>

                    {/* Horizontal Date Scroller */}
                    <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x hide-scrollbar">
                      {availableDays.map((dateObj, i) => {
                        const isSelected =
                          bookingDate &&
                          format(bookingDate, "yyyy-MM-dd") ===
                            format(dateObj, "yyyy-MM-dd");
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleDateSelect(dateObj)}
                            className={`snap-start shrink-0 w-16 h-20 rounded-xl border flex flex-col items-center justify-center transition-all ${
                              isSelected
                                ? "bg-cyan-500/20 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                : "bg-[#0B0F19] border-slate-800 hover:border-slate-600 hover:bg-slate-800/50"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-cyan-400" : "text-slate-400"}`}
                            >
                              {format(dateObj, "MMM")}
                            </span>
                            <span
                              className={`text-xl font-bold mt-0.5 ${isSelected ? "text-white" : "text-slate-200"}`}
                            >
                              {format(dateObj, "d")}
                            </span>
                            <span
                              className={`text-[10px] font-medium mt-0.5 ${isSelected ? "text-cyan-300" : "text-slate-500"}`}
                            >
                              {format(dateObj, "EEE")}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots Area */}
                    <div className="mt-4 flex-1">
                      {bookingDate && (
                        <>
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-white font-semibold text-sm">
                              Available Time (GMT+6)
                            </h3>
                            {loadingSlots && (
                              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                            )}
                          </div>

                          {dateError && (
                            <p className="text-red-400 text-xs">{dateError}</p>
                          )}

                          {!loadingSlots &&
                            availableSlots.length === 0 &&
                            !dateError && (
                              <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-6 text-center">
                                <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                                <p className="text-slate-400 text-xs">
                                  No slots available for this date.
                                </p>
                              </div>
                            )}

                          {!loadingSlots && availableSlots.length > 0 && (
                            <div className="grid grid-cols-3 gap-2.5 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                              {availableSlots.map((slot) => {
                                const isSelected = selectedSlot === slot;
                                const timeString = new Date(
                                  slot,
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  timeZone: "Asia/Dhaka",
                                });
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`py-2.5 px-2 text-xs font-semibold rounded-lg transition-all border ${
                                      isSelected
                                        ? "bg-cyan-500 text-[#080B11] border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)] scale-[1.02]"
                                        : "bg-[#0B0F19] border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/80"
                                    }`}
                                  >
                                    {timeString}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}

                      {!bookingDate && (
                        <div className="bg-[#0B0F19]/50 border border-slate-800/50 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center mt-2">
                          <Calendar className="w-8 h-8 text-slate-600 mb-3 opacity-50" />
                          <p className="text-slate-500 text-xs">
                            Select a date from above to view available time
                            slots.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Next Button */}
                    <div className="mt-6">
                      <button
                        type="button"
                        disabled={!selectedSlot}
                        onClick={() => setBookingStep(2)}
                        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          !selectedSlot
                            ? "bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-800"
                            : "bg-white text-[#080B11] hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
                        }`}
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* -------------------- BOOKING: STEP 2 (DETAILS FORM) -------------------- */}
                {activeTab === "meeting" && bookingStep === 2 && (
                  <motion.form
                    key="booking-step-2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col space-y-5"
                  >
                    {/* Summary Card */}
                    <div className="bg-gradient-to-r from-[#0B0F19] to-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-inner">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                          Selected Time
                        </p>
                        <p className="text-sm font-semibold text-white flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          {bookingDate
                            ? format(bookingDate, "MMM d, yyyy")
                            : ""}{" "}
                          at{" "}
                          {selectedSlot
                            ? new Date(selectedSlot).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  timeZone: "Asia/Dhaka",
                                },
                              )
                            : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
                        title="Change Date/Time"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Meeting Topic
                      </label>
                      <textarea
                        rows={3}
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="What would you like to discuss?"
                        required
                        className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      />
                    </div>

                    <div className="mt-auto pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3.5 rounded-xl text-sm font-bold text-[#080B11] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer ${
                          isSubmitting
                            ? "bg-cyan-600/50 text-cyan-200 cursor-not-allowed"
                            : "bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                        }`}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        <span>
                          {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* -------------------- BOOKING: STEP 3 (SUCCESS) -------------------- */}
                {activeTab === "meeting" && bookingStep === 3 && (
                  <motion.div
                    key="booking-step-3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1 flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-[250px]">
                      Your meeting request has been scheduled successfully. You
                      will receive an email confirmation shortly.
                    </p>
                    <p className="text-slate-500 text-xs">
                      Redirecting back in a few seconds...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
