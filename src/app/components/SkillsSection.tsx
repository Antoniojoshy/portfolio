import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { Brain, Code, Wrench, Camera } from 'lucide-react';

interface SkillProps {
  name: string;
  level: number;
  delay: number;
}

function SkillBar({ name, level, delay }: SkillProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-slate-text">{name}</span>
        <span className="text-bronze-light">{level}%</span>
      </div>
      <div className="h-2 bg-navy-base/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-navy-card via-bronze to-bronze-light rounded-full"
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const skillCategories = [
    {
      title: 'AI / Machine Learning',
      icon: Brain,
      color: 'from-navy-card to-navy-surface',
      skills: [
        { name: 'Deep Learning', level: 90 },
        { name: 'Neural Networks', level: 85 },
        { name: 'Computer Vision', level: 88 },
        { name: 'NLP', level: 80 },
      ],
    },
    {
      title: 'Web Development',
      icon: Code,
      color: 'from-navy-card to-navy-surface',
      skills: [
        { name: 'React / Next.js', level: 92 },
        { name: 'Django / Python', level: 88 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'REST APIs', level: 90 },
      ],
    },
    {
      title: 'Hardware / IoT',
      icon: Wrench,
      color: 'from-navy-surface to-navy-card',
      skills: [
        { name: 'Raspberry Pi', level: 85 },
        { name: 'ESP32 / Arduino', level: 82 },
        { name: '3D Printing', level: 78 },
        { name: 'Electronics', level: 80 },
      ],
    },
    {
      title: 'Creative Tools',
      icon: Camera,
      color: 'from-navy-surface to-navy-card',
      skills: [
        { name: 'Photography', level: 88 },
        { name: 'Adobe Premiere', level: 85 },
        { name: 'After Effects', level: 80 },
        { name: 'Photoshop', level: 87 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-32 bg-gradient-to-b from-navy-base via-navy-surface to-navy-base overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-bronze rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-bronze-light rounded-full blur-3xl opacity-10" />
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
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-bronze to-bronze-light mx-auto mb-6" />
          <p className="text-slate-text text-lg max-w-2xl mx-auto">
            A diverse skill set spanning across multiple disciplines
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-navy-card backdrop-blur-sm rounded-2xl p-8 border border-navy-surface hover:border-bronze/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={categoryIndex * 0.1 + skillIndex * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
