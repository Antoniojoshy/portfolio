import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-navy-base via-navy-surface to-navy-base overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-bronze rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-bronze-light rounded-full blur-3xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-bronze to-bronze-light mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-bronze/20 to-transparent z-10 pointer-events-none" />

              <ImageWithFallback
                src="/about-me.jpg"
                alt="Antonio Joshy"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-navy-card rounded-2xl backdrop-blur-sm border border-bronze/10 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-navy-card backdrop-blur-sm rounded-2xl p-8 border border-navy-surface">
              <h3 className="text-2xl font-bold text-white mb-4">
                Creative Technologist
              </h3>
              <p className="text-slate-text leading-relaxed mb-6">
                I'm a multidisciplinary developer and creator who combines AI, web development, hardware systems, and visual storytelling to build real-world solutions that make a difference.
              </p>
              <p className="text-slate-text leading-relaxed mb-6">
                With expertise spanning from deep learning and neural networks to full-stack development and IoT systems, I thrive on turning complex ideas into tangible, impactful products.
              </p>
              <p className="text-slate-text leading-relaxed">
                When I'm not coding or building AI models, you'll find me behind the camera capturing moments, editing videos, or tinkering with electronics and 3D printers to bring new ideas to life.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '5+', label: 'Projects' },
                { value: '10+', label: 'Technologies' },
                { value: '100%', label: 'Dedication' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-navy-card backdrop-blur-sm rounded-xl p-4 border border-navy-surface text-center"
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bronze to-bronze-light mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-text">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
