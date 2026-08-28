import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Individual Lucide icon imports (tree-shake friendly + alias)
import Quote from '@lucide/quote';
import Star from '@lucide/star';
import ChevronLeft from '@lucide/chevron-left';
import ChevronRight from '@lucide/chevron-right';
import Building2 from '@lucide/building-2';

import GlassCard from '../ui/GlassCard';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array(fullStars).fill(0).map((_, i) => (
        <span key={`full-${i}`} className="text-amber-400">★</span>
      ))}
      {halfStar && <span className="text-amber-400">☆</span>}
      {Array(emptyStars).fill(0).map((_, i) => (
        <span key={`empty-${i}`} className="text-slate-600">★</span>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      quote: "Our business went from constant IT interruptions to a stable, predictable environment. The clarity Syncline provides around what’s happening and why has made a huge difference.",
      author: "Small Business Owner",
      role: "Professional Services",
      company: "Melbourne",
      industry: "SMB",
      rating: 4.8
    },
    {
      quote: "We needed stronger security without the complexity of enterprise tools. Syncline helped us put practical protections in place that fit our size and budget.",
      author: "Business Manager",
      role: "Operations",
      company: "Victoria",
      industry: "SMB",
      rating: 4.7
    },
    {
      quote: "Automating our repetitive tasks has saved hours each week. The improvements were simple, effective, and tailored to how our team actually works.",
      author: "Team Lead",
      role: "Administration",
      company: "Regional VIC",
      industry: "SMB",
      rating: 5.0
    },
    {
      quote: "Remote support has been fast and reliable. Even being outside Melbourne, we get the same level of care and attention as a local business.",
      author: "General Manager",
      role: "Manufacturing",
      company: "Regional Victoria",
      industry: "SMB",
      rating: 4.6
    },
    {
      quote: "Syncline helped us modernise our systems without disrupting day‑to‑day operations. Everything was explained clearly, and the transition was smoother than we expected.",
      author: "Practice Coordinator",
      role: "Healthcare",
      company: "Melbourne",
      industry: "SMB",
      rating: 4.9
    },
    {
      quote: "We finally have an IT setup that makes sense for a small business. No unnecessary tools, no confusing systems — just practical solutions that work.",
      author: "Owner‑Operator",
      role: "Retail",
      company: "Victoria",
      industry: "SMB",
      rating: 4.5
    },
    {
      quote: "The guidance we received around Microsoft 365 has made our team more confident and productive. Support is always clear, friendly, and easy to follow.",
      author: "Office Manager",
      role: "Administration",
      company: "Melbourne",
      industry: "SMB",
      rating: 4.8
    },
    {
      quote: "Having someone who understands our environment and responds quickly has been a game‑changer. We feel supported instead of stuck waiting in queues.",
      author: "Director",
      role: "Construction",
      company: "Regional VIC",
      industry: "SMB",
      rating: 4.7
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <section className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-4">
            Client Success Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Victorian SMBs
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Real results from real businesses across Victoria and regional areas.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 lg:p-12 relative" gradient>
            {/* Quote Icon */}
            <div className="absolute top-6 right-6">
              <Quote className="w-12 h-12 text-blue-400/20" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {/* Rating - Fixed using StarRating component */}
                <div className="mb-6">
                  <StarRating rating={testimonials[current].rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl text-white font-medium leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {testimonials[current].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonials[current].author}</div>
                    <div className="text-sm text-slate-400">{testimonials[current].role}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Building2 className="w-3 h-3" />
                      {testimonials[current].company}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-400">
                      {testimonials[current].industry}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? 'w-8 bg-blue-500' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {[
            { value: '150+', label: 'SMBs Protected' },
            { value: '4.9/5', label: 'Client Rating' },
            { value: '99.9%', label: 'Uptime Achieved' },
            { value: '< 2hr', label: 'Avg Response' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;