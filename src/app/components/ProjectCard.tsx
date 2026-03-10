import React from 'react';
import { motion } from 'motion/react';
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
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-navy-card backdrop-blur-sm rounded-2xl overflow-hidden border border-navy-surface hover:border-bronze/50 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-base via-navy-base/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center gap-4"
        >
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-bronze rounded-full hover:bg-bronze-light transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-navy-base" />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-navy-surface border border-bronze/50 rounded-full hover:bg-bronze/20 transition-colors"
            >
              <Code className="w-5 h-5 text-bronze-light" />
            </a>
          )}
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-bronze group-hover:to-bronze-light transition-all duration-300">
          {title}
        </h3>
        <p className="text-slate-text mb-4 leading-relaxed">
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
