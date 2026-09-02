"use client";
import React, { useState, useEffect } from "react";
import { Mail, MapPin, Send, CheckCircle2, Calendar, Clock, User, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SocialIcons";

export const Contact = () => {
  const [activeTab, setActiveTab] = useState("message"); // "message" or "meeting"

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [bookingDate, setBookingDate] = useState("");
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

  const handleDateChange = async (e) => {
    const selected = e.target.value;
    setBookingDate(selected);
    setSelectedSlot(null);
    setDateError("");
    setAvailableSlots([]);

    if (!selected) return;

    const dateObj = new Date(selected);
    // Friday is 5
    if (dateObj.getDay() === 5) {
      setDateError("Fridays are off. Please select another day.");
      return;
    }

    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/availability?date=${selected}`);
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

    if (activeTab === "meeting" && !selectedSlot) {
      setStatusMsg("Please select an available time slot.");
      setSent(false);
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");

    try {
      const payload = {
        name: formState.name,
        email: formState.email,
        subject: activeTab === "meeting" ? "Meeting Request" : formState.subject,
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
        setStatusMsg("Your request has been sent successfully! I will get back to you shortly.");
        setTimeout(() => {
          setFormState({ name: "", email: "", subject: "", message: "" });
          setBookingDate("");
          setSelectedSlot(null);
          setAvailableSlots([]);
          setSent(false);
          setStatusMsg("");
        }, 4000);
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

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

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
                out or book a direct meeting with me. I'm always open to new opportunities.
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
                  <div className="text-slate-400 text-xs">Saturday - Thursday (Friday Off)</div>
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
          <div className="lg:col-span-7">
            <div className="bg-[#141A26] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg">
              
              {/* Tabs */}
              <div className="flex items-center gap-2 mb-8 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800/50">
                <button
                  onClick={() => { setActiveTab("message"); setStatusMsg(""); }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === "message" 
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700/50" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
                <button
                  onClick={() => { setActiveTab("meeting"); setStatusMsg(""); }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === "meeting" 
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700/50" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Book Meeting
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {statusMsg && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
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

                {activeTab === "meeting" && (
                  <div className="space-y-5 border border-slate-800/60 bg-[#0B0F19]/50 rounded-xl p-5 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Select Date
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={bookingDate}
                        onChange={handleDateChange}
                        className="w-full bg-[#141A26] border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                      />
                      {dateError && <p className="text-red-400 text-xs mt-2">{dateError}</p>}
                    </div>

                    {bookingDate && !dateError && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2 flex justify-between items-center">
                          <span>Available Slots (GMT+6)</span>
                          {loadingSlots && <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />}
                        </label>
                        
                        {!loadingSlots && availableSlots.length === 0 && (
                          <div className="text-slate-400 text-xs py-2">No available slots on this date.</div>
                        )}
                        
                        {!loadingSlots && availableSlots.length > 0 && (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                            {availableSlots.map((slot) => {
                              const dateObj = new Date(slot);
                              const timeString = dateObj.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                timeZone: "Asia/Dhaka", // Show BD time
                              });
                              const isSelected = selectedSlot === slot;
                              
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`py-2 px-1 text-xs font-medium rounded-lg transition-all border ${
                                    isSelected 
                                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" 
                                      : "bg-[#141A26] border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-100"
                                  }`}
                                >
                                  {timeString}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

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
                      className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
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
                      className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {activeTab === "message" && (
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
                      className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {activeTab === "meeting" ? "Meeting Topic / Purpose" : "Message"}
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={activeTab === "meeting" ? "What would you like to discuss?" : "How can I help you?"}
                    required
                    className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (activeTab === "meeting" && !selectedSlot)}
                  className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer ${
                    isSubmitting || (activeTab === "meeting" && !selectedSlot)
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50"
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    activeTab === "meeting" ? <Calendar className="w-4 h-4" /> : <Send className="w-4 h-4" />
                  )}
                  <span>{isSubmitting ? "Processing..." : (activeTab === "meeting" ? "Confirm Booking" : "Send Message")}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
