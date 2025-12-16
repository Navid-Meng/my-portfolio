'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations, techStack } from '@/lib/data';
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

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

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
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6"
        >
          {/* Frontend Category */}
          <div className="md:col-span-6 lg:col-span-6 space-y-6">
            <SpotlightCard className="rounded-3xl p-8 h-full bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {t.frontend}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {techStack.frontend.map((tech) => {
                    const Icon = iconMap[tech.icon] || Code2;
                    return (
                      <div 
                        key={tech.name}
                        className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/50"
                      >
                         <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 group-hover/item:scale-110 transition-transform duration-300">
                            <Icon size={20} className="text-zinc-700 dark:text-zinc-300" />
                         </div>
                         <div>
                            <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                              {tech.name}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {tech.description}
                            </div>
                         </div>
                      </div>
                    );
                  })}
                </div>
            </SpotlightCard>
          </div>

          {/* Backend & Tools Column */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-6">
             {/* Backend */}
             <SpotlightCard className="rounded-3xl p-8 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm flex-1">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Server size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {t.backend}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {techStack.backend.map((tech) => {
                    const Icon = iconMap[tech.icon] || Server;
                     return (
                      <div 
                        key={tech.name}
                        className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/50"
                      >
                         <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 group-hover/item:scale-110 transition-transform duration-300">
                            <Icon size={20} className="text-emerald-600 dark:text-emerald-400" />
                         </div>
                         <div>
                            <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                              {tech.name}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {tech.description}
                            </div>
                         </div>
                      </div>
                    );
                  })}
                </div>
             </SpotlightCard>

             {/* Tools */}
             <SpotlightCard className="rounded-3xl p-8 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <TerminalSquare size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {t.tools}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                   {techStack.tools.map((tech) => {
                    const Icon = iconMap[tech.icon] || TerminalSquare;
                    return (
                      <div 
                        key={tech.name} 
                        className="px-3 py-1.5 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/5 dark:ring-white/10 rounded-full flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors cursor-default"
                      >
                         <Icon size={14} className="text-zinc-500 dark:text-zinc-400" />
                         <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
             </SpotlightCard>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
