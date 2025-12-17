'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { useLanguage } from '@/lib/LanguageContext';
import { translations, socialLinks, techStack } from '@/lib/data';

export default function GravityFooter() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  // Refs to store direct access to DOM elements for performance
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();
  
  // Combine all tech items
  const allTechItems = [
    ...techStack.frontend,
    ...techStack.backend,
    ...techStack.tools
  ];

  // Map display names to correct SimpleIcons slugs
  const slugMap: Record<string, string> = {
    'Next.js': 'nextdotjs',
    'React': 'react',
    'TailwindCSS': 'tailwindcss',
    'TypeScript': 'typescript',
    'Framer Motion': 'framer',
    'Node.js': 'nodedotjs',
    'PostgreSQL': 'postgresql',
    'Prisma': 'prisma',
    'Redis': 'redis',
    'Git': 'git',
    'Docker': 'docker',
    'VS Code': 'visualstudiocode',
  };

  const getIconUrl = (name: string) => {
    const slug = slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Using default color (black) usually, so we might need to invert in dark mode using CSS
    return `https://cdn.simpleicons.org/${slug}`;
  };

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;

    // Disable gravity for floating effect
    engine.gravity.y = 0;
    engine.gravity.x = 0;

    const width = sceneRef.current.clientWidth;
    const height = 400;

    // Boundaries
    const wallOptions = { 
        isStatic: true,
        render: { visible: false },
        restitution: 0.8 // Bouncy walls
    };
    
    // Make walls thicker to prevent tunneling
    const thick = 100;
    const ground = Bodies.rectangle(width / 2, height + thick/2, width, thick, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -thick/2, width, thick, wallOptions);
    const leftWall = Bodies.rectangle(-thick/2, height / 2, thick, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + thick/2, height / 2, thick, height * 2, wallOptions);

    // Create physics bodies for icons
    // We strictly match the index of these bodies to the index of our `allTechItems`
    const techBodies = allTechItems.map((tech) => {
        const x = Math.random() * (width - 100) + 50;
        const y = Math.random() * (height - 100) + 50; // Randomize start position within container
        const size = 60; // Hitbox slightly larger than visual (50px) for easier grabbing

        return Bodies.circle(x, y, size / 2, {
            restitution: 0.9, // High bounciness
            friction: 0.001, // Low friction for continuous floating
            frictionAir: 0.02, // Simulate air resistance so they don't accelerate forever
            density: 0.04,
            label: tech.name,
            // Give initial random velocity
            velocity: {
                x: (Math.random() - 0.5) * 5,
                y: (Math.random() - 0.5) * 5
            }
        });
    });

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, ...techBodies]);

    // Track mouse position for hover interaction
    const mouse = Mouse.create(sceneRef.current);
    mouse.pixelRatio = 1;
    const mouseAny = mouse as any;
    
    // Critical: Remove Matter.js's scroll event listeners to allow normal page scrolling
    // Matter.js captures mousewheel by default which prevents scrolling over the footer
    if (mouseAny.element && mouseAny.mousewheel) {
      mouseAny.element.removeEventListener("mousewheel", mouseAny.mousewheel);
      mouseAny.element.removeEventListener("DOMMouseScroll", mouseAny.mousewheel);
      mouseAny.element.removeEventListener("wheel", mouseAny.mousewheel);
    }

    // Sync Loop: Update DOM elements and apply forces
    Events.on(engine, 'beforeUpdate', () => {
        techBodies.forEach(body => {
            // 1. Continuous Random Floating (Brownian Motion)
            // Apply a tiny force every frame to ensure infinite movement
            const randomForceX = (Math.random() - 0.5) * 0.0002;
            const randomForceY = (Math.random() - 0.5) * 0.0002;
            
            Matter.Body.applyForce(body, body.position, {
                x: randomForceX,
                y: randomForceY
            });

            // Keep angular velocity alive for subtle rotation
            if (Math.abs(body.angularVelocity) < 0.002) {
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.005);
            }

            // 2. Hover Repulsion (Mouse Interaction)
            const dx = body.position.x - mouse.position.x;
            const dy = body.position.y - mouse.position.y;
            const distanceSq = dx * dx + dy * dy;
            const interactionRadius = 150; // Range of effect

            // Only apply if mouse is within range and "on screen"
            if (distanceSq < interactionRadius * interactionRadius && mouse.position.x !== 0 && mouse.position.y !== 0) {
                const distance = Math.sqrt(distanceSq);
                const forceMagnitude = 0.001; // Gentle push strength
                
                // Repulsion force vector
                const force = forceMagnitude * (1 - distance / interactionRadius);
                
                Matter.Body.applyForce(body, body.position, {
                    x: (dx / distance) * force,
                    y: (dy / distance) * force
                });
            }
        });
    });

    // Update DOM positions and Scale based on proximity
    Events.on(engine, 'afterUpdate', () => {
        techBodies.forEach((body, index) => {
            const domNode = iconRefs.current[index];
            if (domNode) {
                const { x, y } = body.position;
                const angle = body.angle;

                // Calculate scale based on mouse proximity
                let scale = 1;
                const dx = body.position.x - mouse.position.x;
                const dy = body.position.y - mouse.position.y;
                const distanceSq = dx * dx + dy * dy;
                const interactionRadius = 150;

                if (distanceSq < interactionRadius * interactionRadius && mouse.position.x !== 0 && mouse.position.y !== 0) {
                    const distance = Math.sqrt(distanceSq);
                    // Scale up to 1.3x as it gets closer
                    scale = 1 + 0.3 * (1 - distance / interactionRadius); 
                }

                // Update transform directly for performance
                domNode.style.transform = `translate(${x - 25}px, ${y - 25}px) rotate(${angle}rad) scale(${scale})`;
            }
        });
    });



    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    const handleResize = () => {
        if (!sceneRef.current) return;
        const newWidth = sceneRef.current.clientWidth;
        
        Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 30 });
        Matter.Body.setVertices(ground, Matter.Bodies.rectangle(newWidth / 2, height + 30, newWidth, 60).vertices);
        
        Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -30 });
        Matter.Body.setVertices(ceiling, Matter.Bodies.rectangle(newWidth / 2, -30, newWidth, 60).vertices);

        Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: height / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <footer className="relative w-full border-t border-zinc-300 dark:border-zinc-800 bg-[#f5f1eb] dark:bg-black overflow-hidden mt-20">
      <div className="absolute top-0 left-0 w-full text-center pt-8 pointer-events-none z-10">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
            Tech Gravity
        </h2>
        <p className="text-zinc-600 text-xs mt-2">
            My tech stack in zero-gravity. Hover to disturb.
        </p>
      </div>

      <div 
        ref={sceneRef} 
        className="w-full h-[400px] relative z-0 overflow-hidden" 
      >
          {/* Render HTML elements for each tech item */}
          {allTechItems.map((tech, index) => (
              <div
                key={tech.name + index}
                ref={(el) => { iconRefs.current[index] = el; }}
                className="absolute top-0 left-0 w-[50px] h-[50px] rounded-full bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center pointer-events-none select-none border border-zinc-300 dark:border-zinc-800"
                style={{ willChange: 'transform' }} // Optimize for movement
              >
                  {/* Icon Image */}
                  <img 
                    src={getIconUrl(tech.name)} 
                    alt={tech.name}
                    className="w-6 h-6 object-contain dark:invert" // Invert colors in dark mode for visibility
                    draggable={false}
                  />
              </div>
          ))}
      </div>
      
      {/* Static Social Links */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6 pointer-events-none opacity-40 hover:opacity-100 transition-opacity z-20">
         <a href={socialLinks.github} target="_blank" className="pointer-events-auto text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white">GitHub</a>
         <a href={socialLinks.linkedin} target="_blank" className="pointer-events-auto text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white">LinkedIn</a>
         <a href={socialLinks.twitter} target="_blank" className="pointer-events-auto text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white">Twitter</a>
      </div>
    </footer>
  );
}
