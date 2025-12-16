'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations, community } from '@/lib/data';
import SpotlightCard from '../shared/SpotlightCard';
import { Youtube, Send, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Community() {
  const { language } = useLanguage();
  const t = translations[language].community;

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Parallax Background Orbs */}
      <motion.div 
        animate={{ 
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-purple-500/10 dark:bg-purple-900/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
          y: [20, -20, 20],
          x: [10, -10, 10],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 mb-6 border border-zinc-200 dark:border-zinc-700/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Active Community</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white">
            {t.title}
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* YouTube Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={community.youtube.link} target="_blank" rel="noopener noreferrer">
              <SpotlightCard 
                className="group relative rounded-3xl p-1 h-full bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden"
                spotlightColor="rgba(239, 68, 68, 0.2)"
              >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative h-full bg-white/50 dark:bg-zinc-900/80 rounded-[1.3rem] p-8 flex flex-col">
                      <div className="flex items-start justify-between mb-8">
                          <div className="p-4 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-500 ring-1 ring-red-500/20 group-hover:scale-110 transition-transform duration-300">
                              <Youtube size={36} />
                          </div>
                          <ArrowUpRight className="text-zinc-400 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>
                      
                      <div className="mt-auto space-y-4">
                          <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              {community.youtube.title}
                          </h3>
                          <p className="text-zinc-600 dark:text-zinc-400">
                              {community.youtube.description}
                          </p>
                          <div className="flex items-center gap-3 pt-4">
                              <div className="flex -space-x-3">
                                  {[1,2,3].map((i) => (
                                     <div key={i} className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-800" />
                                  ))}
                              </div>
                              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                  {community.youtube.subscribers} Subscribers
                              </span>
                          </div>
                      </div>
                  </div>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* Telegram Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <Link href={community.telegram.link} target="_blank" rel="noopener noreferrer">
               <SpotlightCard 
                className="group relative rounded-3xl p-1 h-full bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden"
                spotlightColor="rgba(59, 130, 246, 0.2)"
              >
                 <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                 <div className="relative h-full bg-white/50 dark:bg-zinc-900/80 rounded-[1.3rem] p-8 flex flex-col">
                    <div className="flex items-start justify-between mb-8">
                        <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-500 ring-1 ring-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Send size={36} />
                        </div>
                         <ArrowUpRight className="text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                    
                    <div className="mt-auto space-y-4">
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {community.telegram.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            {community.telegram.description}
                        </p>
                        <div className="flex items-center gap-3 pt-4">
                            <div className="flex -space-x-3">
                                {[1,2,3].map((i) => (
                                   <div key={i} className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-800" />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                {community.telegram.members} Members
                            </span>
                        </div>
                    </div>
                 </div>
              </SpotlightCard>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
