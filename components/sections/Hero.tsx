'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/data';
import MagneticButton from '../shared/MagneticButton';
import { ArrowDown } from 'lucide-react';

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative flex flex-col justify-center min-h-screen px-6 overflow-hidden">
      {/* Fluid Background */}
      <div className="absolute inset-0 -z-10 bg-zinc-50 dark:bg-black">
        <motion.div 
            style={{ y: y1, opacity: 0.6 }}
            animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div 
            style={{ y: y2, opacity: 0.6 }}
            animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, -60, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-400/20 to-cyan-500/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen" 
        />
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         <div className="order-2 lg:order-1">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/5 dark:bg-white/10 border border-zinc-900/10 dark:border-white/10 text-sm font-medium text-zinc-600 dark:text-zinc-300 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for work
                </div>

                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[0.9]">
                    {t.greeting} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {language === 'en' ? 'Navid.' : 'ណាវីដ.'}
                    </span>
                </h1>
                
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-zinc-600 dark:text-zinc-400">
                    I am a <ScrambleText text={t.role} className="font-semibold text-zinc-900 dark:text-zinc-100" />
                </div>

                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
                    {t.intro}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <MagneticButton>
                        <Link
                            href="/projects"
                            className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            {t.cta_primary}
                        </Link>
                    </MagneticButton>
                    
                    <MagneticButton>
                        <Link
                            href="/about"
                            className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-900 dark:text-white font-medium text-lg transition-all hover:bg-white dark:hover:bg-zinc-800 hover:scale-105 active:scale-95"
                        >
                            {t.cta_secondary}
                        </Link>
                    </MagneticButton>
                </div>
            </motion.div>
         </div>

         {/* 3D Visual / Minimalist Graphic Side */}
         <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
             <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-72 h-72 sm:w-96 sm:h-96"
             >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2rem] rotate-6 opacity-20 blur-2xl animate-pulse"></div>
                <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                    
                    {/* Abstract Code Visualization */}
                    <div className="space-y-2 p-6 w-full opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="h-2 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                        <div className="h-2 w-2/3 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                        <div className="h-2 w-1/2 bg-blue-400/50 rounded-full"></div>
                         <div className="h-2 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                         <div className="h-2 w-1/4 bg-purple-400/50 rounded-full"></div>
                    </div>
                    
                    {/* Floating Badge */}
                    <motion.div 
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-8 top-8 p-4 bg-white dark:bg-black rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800"
                    >
                         <div className="text-4xl">🚀</div>
                    </motion.div>
                     <motion.div 
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute left-8 bottom-8 p-4 bg-white dark:bg-black rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800"
                    >
                         <div className="text-4xl">✨</div>
                    </motion.div>
                </div>
             </motion.div>
         </div>
      </div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-600"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}
