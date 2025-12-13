'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
    >
      {language === 'en' ? 'KH' : 'EN'}
    </button>
  );
}
