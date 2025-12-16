'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function InfiniteMarquee({ 
  children, 
  direction = 'left', 
  speed = 20, 
  className = '' 
}: { 
  children: React.ReactNode; 
  direction?: 'left' | 'right'; 
  speed?: number; 
  className?: string;
}) {
  return (
    <div className={`flex overflow-hidden relative z-0 ${className}`}>
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-10" />
        
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: direction === 'left' ? '-50%' : '50%' }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-shrink-0 gap-4 py-4"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
