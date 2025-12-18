import React from 'react';
import { Mail, Github, Linkedin, MapPin, Instagram } from 'lucide-react';
import ContactForm from '@/components/sections/ContactForm';

const SubtleSocialLink = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-all duration-300"
    aria-label={label}
  >
    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm font-medium hidden sm:block">{label}</span>
  </a>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f1eb] dark:bg-black selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-200/50 dark:bg-zinc-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-zinc-300/30 dark:bg-zinc-800/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen flex flex-col">
        
        {/* Header Section */}
        <div className="mb-20 space-y-4">
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
            Contact
          </p>
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-white italic">
            "Everything starts with a story."
          </h1>
        </div>

        {/* Narrative Form Section */}
        <div className="flex-1 max-w-5xl">
          <ContactForm />
        </div>

        {/* Subtle Footer with Socials & Location */}
        <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-wrap gap-6">
            <SubtleSocialLink icon={Github} href="https://github.com/Navid-Meng" label="GitHub" />
            <SubtleSocialLink icon={Linkedin} href="https://linkedin.com/in/meng-navid" label="LinkedIn" />
            <SubtleSocialLink icon={Mail} href="mailto:navid.meng@gmail.com" label="Email" />
            <SubtleSocialLink icon={Instagram} href="#" label="Instagram" />
          </div>
          
          <div className="flex items-center gap-3 text-zinc-400 dark:text-zinc-600">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Phnom Penh, Cambodia</span>
          </div>
        </div>
      </div>
    </div>
  );
}


