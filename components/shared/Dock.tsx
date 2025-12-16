'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

export const Dock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`mx-auto flex h-16 items-end gap-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 px-4 pb-3 backdrop-blur-sm border border-gray-200 dark:border-zinc-800 ${className}`}
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as any, { mouseX: mouseX });
      })}
    </motion.div>
  );
};

export const DockIcon = ({ 
    mouseX, 
    children, 
    className 
}: { 
    mouseX?: MotionValue; 
    children: React.ReactNode; 
    className?: string 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX!, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={`aspect-square w-10 text-zinc-600 dark:text-zinc-400 rounded-full flex items-center justify-center bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 ${className}`}
    >
      {children}
    </motion.div>
  );
};
