'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import ThemeToggle from '../shared/ThemeToggle';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/data';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const { language } = useLanguage();
  const t = translations[language].nav;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: t.projects, href: '/projects' },
    { name: t.about, href: '/about' },
    { name: t.contact, href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto relative flex items-center justify-between px-2 pl-6 pr-2 h-14 md:h-16 rounded-full bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg shadow-black/5 ring-1 ring-black/5">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="group relative z-10 flex items-center gap-1 pr-6"
          >
            <motion.span
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100"
             >
              Portfolio.
             </motion.span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-800/50 p-1.5 rounded-full border border-black/5 dark:border-white/5">
              {navLinks.map((link) => {
                const isActive = link.href === (hoveredPath || pathname);
                
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredPath(link.href)}
                      onMouseLeave={() => setHoveredPath(null)}
                      className="relative px-4 py-2 block text-sm font-medium transition-colors"
                    >
                      <motion.span 
                        className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                      </motion.span>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-pill"
                          className="absolute inset-0 bg-white dark:bg-zinc-700/90 rounded-full shadow-sm"
                          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-3 opacity-50" />
            
            <div className="flex items-center gap-1.5 pl-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden pl-4">
             <div className="scale-90 flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitcher />
             </div>
             <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"/><path d="M6 6 18 18"/>
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-2 ring-1 ring-black/5"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center p-4 text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
