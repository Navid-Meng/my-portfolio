'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ChevronRight } from 'lucide-react';

const AutoSizeInput = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className = "" 
}: { 
  name: string, 
  value: string, 
  onChange: (e: any) => void, 
  placeholder: string,
  type?: string,
  className?: string
}) => {
  return (
    <div className="inline-grid align-baseline items-center justify-items-start relative group">
      {/* Hidden element for measuring width/height */}
      <span 
        className={`col-start-1 row-start-1 invisible whitespace-pre-wrap break-all px-1 min-w-[20px] text-2xl lg:text-5xl font-medium tracking-tight ${className}`}
        aria-hidden="true"
      >
        {value || placeholder}
      </span>
      
      {/* Actual input element */}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={1}
        className={`
          col-start-1 row-start-1 w-full h-full resize-none overflow-hidden
          bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 
          focus:border-zinc-900 dark:focus:border-white 
          outline-none transition-colors duration-300 
          p-0 px-1 text-zinc-900 dark:text-white 
          placeholder:text-zinc-300 dark:placeholder:text-zinc-700
          text-2xl lg:text-5xl font-medium tracking-tight
          ${className}
        `}
      />
    </div>
  );
};

export default function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSent(true);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.form
            key="story-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className="text-2xl lg:text-5xl font-medium leading-[1.6] lg:leading-[1.4] text-zinc-400 dark:text-zinc-600 tracking-tight">
              <span>Hi Navid! My name is </span>
              <AutoSizeInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="font-bold lowercase decoration-zinc-900"
              />
              <span className="ml-2">and I'm reaching out from </span>
              <AutoSizeInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                type="email"
                className="font-bold lowercase"
              />
              <br className="hidden lg:block" />
              <span className="mt-4 inline-block">because I'd like to </span>
              <AutoSizeInput
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="collaborate on a project"
                className="font-bold lowercase ml-3"
              />
              <span>. </span>
              <br className="hidden lg:block" />
              <span>Here are some details: </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your story here..."
                rows={1}
                className="
                  w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 
                  focus:border-zinc-900 dark:focus:border-white 
                  outline-none transition-all duration-300 
                  p-0 mt-4 text-zinc-900 dark:text-white
                  placeholder:text-zinc-300 dark:placeholder:text-zinc-700
                  font-bold italic resize-none overflow-hidden
                "
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
              <span className="mt-8 block">Let's connect!</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              className="mt-16 group flex items-center gap-4 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-xl lg:text-2xl transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Story</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center space-y-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
              <CheckCircle2 className="w-24 h-24 text-green-500 relative" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Message Received!</h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                I loved reading your story. I'll get back to you within 24 hours to continue the conversation.
              </p>
            </div>
            <button 
              onClick={() => setIsSent(false)}
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
