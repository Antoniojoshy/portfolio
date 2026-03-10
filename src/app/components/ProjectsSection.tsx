import React from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  const projects = [
    {
      title: 'Brain Age & Alzheimer\'s Detection',
      description: 'Deep learning model analyzing brain scans to detect Alzheimer\'s disease and predict brain age using advanced CNN architectures.',
      image: 'https://images.unsplash.com/photo-1758691463110-697a814b2033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMHNjYW4lMjBtZWRpY2FsJTIwaW1hZ2luZ3xlbnwxfHx8fDE3NzI3OTE5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Python', 'TensorFlow', 'CNN', 'Deep Learning', 'Medical AI'],
    },
    {
      title: 'Handwriting Synthesis System',
      description: 'AI-powered system that generates realistic handwriting using neural networks, capable of learning and replicating various handwriting styles.',
      image: 'https://images.unsplash.com/photo-1731963094554-c5c981ccdefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd3JpdGluZyUyMHBlbiUyMHBhcGVyfGVufDF8fHx8MTc3Mjc5MTkxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Neural Networks', 'GANs', 'Computer Vision', 'PyTorch'],
    },
    {
      title: 'Crop Disease Detection System',
      description: 'ML-based agricultural solution for detecting crop diseases, providing pesticide recommendations, and connecting farmers with an integrated marketplace.',
      image: 'https://images.unsplash.com/photo-1758903178566-81b9026340ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwZGlzZWFzZSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3Mjc5MTkxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Machine Learning', 'Image Classification', 'Django', 'IoT'],
    },
    {
      title: 'Django Portfolio System',
      description: 'Dynamic portfolio platform with a powerful backend, featuring content management, admin dashboard, and real-time updates.',
      image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzI3NzIwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Django', 'REST API', 'PostgreSQL', 'React', 'Full Stack'],
    },
    {
      title: 'Photography Website',
      description: 'Stunning visual showcase featuring an elegant image gallery, lightbox previews, and optimized media delivery for professional photography.',
      image: 'https://images.unsplash.com/photo-1588420635201-3a9e2a2a0a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzI3NjI5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Tailwind CSS', 'Responsive', 'UI/UX'],
    },
  ];

  return (
    <section id="projects" className="relative py-32 bg-navy-base overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-bronze rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-bronze-light rounded-full blur-3xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-bronze to-bronze-light mx-auto mb-6" />
          <p className="text-slate-text text-lg max-w-2xl mx-auto">
            Innovative solutions combining AI, web development, and creative technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
