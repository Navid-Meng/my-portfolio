'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations, techStack } from '@/lib/data';
import SpotlightCard from '../shared/SpotlightCard';
import { 
  Code2, Atom, Paintbrush, FileCode2, Move, 
  Server, Database, Box, Zap, 
  GitBranch, Container, TerminalSquare, 
  LucideIcon 
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code2, Atom, Paintbrush, FileCode2, Move,
  Server, Database, Box, Zap,
  GitBranch, Container, TerminalSquare
};

export default function TechStack() {
  const { language } = useLanguage();
  const t = translations[language].techStack;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)]"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20 text-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
            {t.title}
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]"
        >
            {/* Frontend: Spans 2 cols, 2 rows on large */}
            <motion.div variants={item} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
                <SpotlightCard className="h-full rounded-3xl p-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800" spotlightColor="rgba(59, 130, 246, 0.2)">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
                            <Code2 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{t.frontend}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {techStack.frontend.map((tech) => {
                             const Icon = iconMap[tech.icon] || Code2;
                             return (
                                <div key={tech.name} className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group">
                                     <div className="mt-1 text-zinc-400 group-hover:text-blue-500 transition-colors">
                                         <Icon size={18} />
                                     </div>
                                     <div>
                                         <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{tech.name}</div>
                                         <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">{tech.description}</div>
                                     </div>
                                </div>
                             )
                        })}
                    </div>
                </SpotlightCard>
            </motion.div>

             {/* Backend: Spans 1 col */}
             <motion.div variants={item} className="md:col-span-1 lg:col-span-1 lg:row-span-2">
                <SpotlightCard className="h-full rounded-3xl p-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800" spotlightColor="rgba(16, 185, 129, 0.2)">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                            <Server size={24} />
                        </div>
                         <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{t.backend}</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                         {techStack.backend.map((tech) => {
                             const Icon = iconMap[tech.icon] || Server;
                             return (
                                 <div key={tech.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group">
                                      <div className="text-zinc-400 group-hover:text-emerald-500 transition-colors">
                                         <Icon size={18} />
                                     </div>
                                     <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{tech.name}</span>
                                 </div>
                             )
                         })}
                    </div>
                </SpotlightCard>
             </motion.div>

              {/* Tools: Spans 1 col (stacked on mobile) */}
             <motion.div variants={item} className="md:col-span-3 lg:col-span-1 lg:row-span-2">
                 <SpotlightCard className="h-full rounded-3xl p-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800" spotlightColor="rgba(249, 115, 22, 0.2)">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/20">
                            <TerminalSquare size={24} />
                        </div>
                         <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{t.tools}</h3>
                    </div>
                     <div className="flex flex-wrap gap-2">
                         {techStack.tools.map((tech) => {
                             const Icon = iconMap[tech.icon] || TerminalSquare;
                             return (
                                 <div key={tech.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 hover:border-orange-500/50 transition-colors">
                                      <Icon size={14} className="text-orange-500" />
                                     <span className="font-medium text-zinc-900 dark:text-zinc-100 text-xs">{tech.name}</span>
                                 </div>
                             )
                         })}
                    </div>
                </SpotlightCard>
             </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
