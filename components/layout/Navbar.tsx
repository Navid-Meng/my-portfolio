'use client';

import Link from 'next/link';
import React from 'react';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/data';

export default function Navbar() {
  const { language } = useLanguage();
  const t = translations[language].nav;

  const navLinks = [
    { name: t.projects, href: '/projects' },
    { name: t.about, href: '/about' },
    { name: t.contact, href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          Portfolio.
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
