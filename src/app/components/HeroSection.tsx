import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Instagram, Mail, ArrowRight } from 'lucide-react';
import { ParticleWaveBackground } from './ParticleWaveBackground';

export function HeroSection() {
  const roles = ['AI Developer', 'Full Stack Developer', 'Photographer', 'Video Editor', 'DIY Engineer'];
  const [currentRole, setCurrentRole] = React.useState(0);
  const [isHoveringTitle, setIsHoveringTitle] = React.useState(false);
  const { scrollY } = useScroll();

  // Parallax effect for content
  const contentY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      <ParticleWaveBackground isHovering={isHoveringTitle} />

      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 via-transparent to-[#0a0f1f]/90 z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-4 relative"
          onMouseEnter={() => setIsHoveringTitle(true)}
          onMouseLeave={() => setIsHoveringTitle(false)}
        >

          <motion.h1
            className="text-4xl xs:text-5xl md:text-8xl font-bold text-white mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="inline-block"
            >
              Antonio
            </motion.span>
            {' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="inline-block text-bronze"
            >
              Joshy
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Role Text (Reverted to old design) */}
        <div className="h-16 md:h-20 flex items-center justify-center">
          <motion.h2
            key={currentRole}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 90 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-xl md:text-4xl font-light text-slate-text uppercase tracking-[0.2em]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {roles[currentRole]}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-slate-text text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Creative Technologist combining AI, web development, hardware systems, and visual storytelling to build real-world solutions
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto group relative px-8 py-4 bg-navy-card border border-bronze/30 text-white rounded-full overflow-hidden backdrop-blur-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(197, 155, 118, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-bronze to-bronze-light"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center justify-center gap-2">
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto px-8 py-4 bg-navy-surface text-white rounded-full backdrop-blur-sm border border-navy-card relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(197, 155, 118, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-navy-card"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative flex justify-center">Contact Me</span>
          </motion.button>
        </motion.div>

        {/* Social Links (Centered row) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex gap-8 md:gap-6 justify-center"
        >
          {[
            { icon: Github, href: 'https://github.com/Antoniojoshy', color: 'hover:text-bronze' },
            { icon: Instagram, href: 'https://instagram.com/antonio_joshy_/', color: 'hover:text-bronze-light' },
            { icon: Mail, href: 'mailto:antoniojoshy8@gmail.com', color: 'hover:text-white' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 md:p-3 bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 group ${social.color}`}
              whileHover={{
                scale: 1.15,
                rotate: 5,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.4)",
              }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <social.icon className="w-6 h-6 text-white transition-colors" />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}