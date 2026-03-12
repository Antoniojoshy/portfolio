import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Code } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  index: number;
}

export function ProjectCard({ title, description, image, tags, link, github, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  // Shine effect position
  const shineX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 20 });
  const shineY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative bg-navy-card backdrop-blur-sm rounded-2xl overflow-hidden border border-navy-surface hover:border-bronze/50 transition-colors duration-300 cursor-pointer"
    >
      {/* Dynamic Shine Effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [shineX, shineY],
            ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.1) 0%, transparent 60%)`
          ),
        }}
      />

      <div className="relative h-64 overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-base via-navy-base/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-bronze rounded-full hover:bg-bronze-light transition-colors transform hover:scale-110"
            >
              <ExternalLink className="w-5 h-5 text-navy-base" />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-navy-surface border border-bronze/50 rounded-full hover:bg-bronze/20 transition-colors transform hover:scale-110"
            >
              <Code className="w-5 h-5 text-bronze-light" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 relative z-10" style={{ transform: 'translateZ(40px)' }}>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-bronze group-hover:to-bronze-light transition-all duration-300">
          {title}
        </h3>
        <p className="text-slate-text mb-4 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-white/5 text-slate-300 rounded-full border border-white/10 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-bronze/20 to-transparent blur-3xl group-hover:w-48 group-hover:h-48 transition-all duration-500" />
    </motion.div>
  );
}
