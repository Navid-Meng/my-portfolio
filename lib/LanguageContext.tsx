'use client';

import { motion, AnimatePresence } from 'framer-motion';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'km';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Optional: Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Language;
    if (saved) setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'km' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      <div className={language === 'km' ? 'font-kantumruy' : 'font-outfit'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
