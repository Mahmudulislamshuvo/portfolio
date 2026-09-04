"use client";
import React, { useState } from 'react';
import { FaArrowLeft as ArrowLeft, FaUser as User, FaBuilding as Building2, FaFolder as FolderKanban, FaStar as Star, FaCommentAlt as MessageSquare, FaPaperPlane as Send, FaCheck as Check } from "react-icons/fa";
import { AVATAR_OPTIONS } from '../data/portfolioData';

import { useRouter } from "next/navigation";

export const ReviewFormView = () => {
  const router = useRouter();
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

    // onSubmitReview(newReview);
    setSubmitted(true);

    setTimeout(() => {
      router.push("/");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-secondary py-12 px-4 sm:px-6 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="w-full max-w-2xl relative z-10">
        {/* Back Link */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-text-muted hover:text-accent-text mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        {/* Form Container Card */}
        <div className="bg-bg-card border border-border-subtle rounded-lg p-7 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Share Your{' '}
              <span className="text-accent-text">
                Experience
              </span>
            </h1>
            <p className="text-text-muted text-xs sm:text-sm mt-2">
              Your testimonial helps build trust and improve the service quality.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-accent/15 border border-accent/30 rounded-full flex items-center justify-center mx-auto text-accent-text">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">Thank You for Your Feedback!</h2>
              <p className="text-text-muted text-sm max-w-md mx-auto">
                Your review has been successfully added and is now published on the public portfolio.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-md bg-red-500/10 border border-red-500/30 text-red-500 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              {/* Row 1: Full Name & Role & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-2">
                    <User className="w-3.5 h-3.5 text-accent-text" />
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
                    className="w-full bg-bg-main border border-border-subtle rounded-md px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-2">
                    <Building2 className="w-3.5 h-3.5 text-accent-text" />
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
                    className="w-full bg-bg-main border border-border-subtle rounded-md px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Project Category */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-2">
                  <FolderKanban className="w-3.5 h-3.5 text-accent-text" />
                  <span>Project Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-bg-main border border-border-subtle rounded-md px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-bg-card text-text-muted">
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-bg-card text-text-primary">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 3: Overall Rating */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center gap-3 bg-bg-main border border-border-subtle rounded-md px-4 py-3">
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
                          className="p-1 text-border-strong hover:text-accent-text transition-colors focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-all ${
                              star <= displayRating
                                ? 'text-accent-text fill-accent-text scale-110'
                                : 'text-border-strong'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-mono text-accent-text font-medium">
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
                <label className="block text-xs font-semibold text-text-secondary mb-2.5">
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
                          ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg-card scale-105'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={avatarUrl}
                        alt={`Avatar option ${idx + 1}`}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      {selectedAvatar === avatarUrl && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-[10px] font-bold shadow">
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
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
                    <MessageSquare className="w-3.5 h-3.5 text-accent-text" />
                    <span>Review Message</span>
                  </label>
                  <span className="text-[11px] font-mono text-text-muted">
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
                  className="w-full bg-bg-main border border-border-subtle rounded-md px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-md text-xs sm:text-sm font-mono font-medium text-accent-foreground bg-accent hover:bg-accent-hover shadow-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>

              {/* Terms disclaimer */}
              <p className="text-center text-[11px] text-text-muted font-normal">
                By submitting, you agree to show this feedback on the public portfolio.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};




