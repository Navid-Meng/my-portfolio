'use client';

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/data';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="flex flex-col justify-center min-h-[80vh] px-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-zinc-900 dark:text-zinc-100">
          {t.greeting} <span className="font-semibold">{t.role}</span>.
          <br />
          {t.description_prefix} <span className="italic text-zinc-500 dark:text-zinc-400">{t.clarity}</span> {t.and} <span className="italic text-zinc-500 dark:text-zinc-400">{t.purpose}</span>.
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {t.intro}
        </p>

        <div className="pt-4 flex items-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all"
          >
            {t.cta_primary}
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
          >
            {t.cta_secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
