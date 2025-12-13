'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors overflow-hidden relative"
      whileTap={{ scale: 0.95 }}
      layout
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={language}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {language === 'en' ? 'KH' : 'EN'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
