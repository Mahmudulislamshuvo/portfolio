"use client";
import React, { useState } from 'react';
import { ArrowLeft, User, Building2, FolderKanban, Star, MessageSquare, Send, Check } from 'lucide-react';
import { AVATAR_OPTIONS } from '../data/portfolioData';

export const ReviewFormView = ({ onBack, onSubmitReview }) => {
  const [fullName, setFullName] = useState('');
  const [roleCompany, setRoleCompany] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'React / Next.js Web App',
    'UI / UX & Design Systems',
    'Full-Stack Architecture',
    'Performance & Web Vitals',
    'Mobile Responsive Optimization',
    'Codebase Refactoring',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!roleCompany.trim()) {
      setError('Please enter your role and company.');
      return;
    }
    if (!category) {
      setError('Please select a project category.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Review message must be at least 10 characters.');
      return;
    }

    let role = roleCompany;
    let company = '';
    if (roleCompany.toLowerCase().includes(' at ')) {
      const parts = roleCompany.split(/ at /i);
      role = parts[0].trim();
      company = parts[1].trim();
    } else if (roleCompany.includes(',')) {
      const parts = roleCompany.split(',');
      role = parts[0].trim();
      company = parts[1].trim();
    }

    const newReview = {
      id: 'rev-' + Date.now(),
      name: fullName.trim(),
      role: role || 'Client',
      company: company || 'Company',
      rating,
      comment: message.trim(),
      avatar: selectedAvatar,
      category,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmitReview(newReview);
    setSubmitted(true);

    setTimeout(() => {
      onBack();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-300 py-12 px-4 sm:px-6 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background glow backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        {/* Form Container Card */}
        <div className="bg-[#141A26] border border-slate-800 rounded-2xl p-7 sm:p-10 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Share Your{' '}
              <span className="text-cyan-400">
                Experience
              </span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Your testimonial helps build trust and improve the service quality.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Thank You for Your Feedback!</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Your review has been successfully added and is now published on the public portfolio.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/80 text-red-300 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              {/* Row 1: Full Name & Role & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. Jane Cooper"
                    className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Role & Company</span>
                  </label>
                  <input
                    type="text"
                    value={roleCompany}
                    onChange={(e) => {
                      setRoleCompany(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. CEO at TechCorp"
                    className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Project Category */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                  <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Project Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
                >
                  <option value="" disabled className="bg-[#0F141E] text-slate-500">
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0F141E] text-slate-200">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 3: Overall Rating */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center gap-3 bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const displayRating = hoverRating !== null ? hoverRating : rating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 text-slate-600 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-all ${
                              star <= displayRating
                                ? 'text-cyan-400 fill-cyan-400 scale-110'
                                : 'text-slate-700'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-medium">
                    {rating === 5 && '5.0 (Exceptional)'}
                    {rating === 4 && '4.0 (Very Good)'}
                    {rating === 3 && '3.0 (Good)'}
                    {rating === 2 && '2.0 (Fair)'}
                    {rating === 1 && '1.0 (Needs Improvement)'}
                  </span>
                </div>
              </div>

              {/* Row 4: Avatar Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2.5">
                  Avatar Selection
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {AVATAR_OPTIONS.map((avatarUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(avatarUrl)}
                      className={`relative rounded-full p-0.5 transition-all duration-200 shrink-0 cursor-pointer ${
                        selectedAvatar === avatarUrl
                          ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0D121D] scale-105'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={avatarUrl}
                        alt={`Avatar option ${idx + 1}`}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      {selectedAvatar === avatarUrl && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center text-slate-950 text-[10px] font-bold shadow">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Review Message */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Review Message</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    {message.length} / min 10 chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setError('');
                  }}
                  placeholder="What was it like working together? (Min 10 characters)"
                  className="w-full bg-[#141A26] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>

              {/* Terms disclaimer */}
              <p className="text-center text-[11px] text-slate-400 font-normal">
                By submitting, you agree to show this feedback on the public portfolio.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
