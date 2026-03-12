import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.1],
    };

    const intersectingSections = new Set<string>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.add(entry.target.id);
        } else {
          intersectingSections.delete(entry.target.id);
        }
      });

      const sectionOrder = ['home', 'about', 'projects', 'skills', 'gallery', 'contact'];
      let highestIndex = -1;
      let mostRelevantSection = activeSection;

      sectionOrder.forEach((id, index) => {
        if (intersectingSections.has(id)) {
          if (index > highestIndex) {
            highestIndex = index;
            mostRelevantSection = id;
          }
        }
      });

      if (mostRelevantSection !== activeSection) {
        setActiveSection(mostRelevantSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['home', 'about', 'projects', 'skills', 'gallery', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-500 max-w-5xl w-full
            ${isScrolled 
              ? 'bg-[#020617]/70 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] shadow-bronze/5' 
              : 'bg-transparent border-transparent'
            }`}
        >
          {/* Subtle Hover Glow Effect */}
          <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-bronze/0 via-bronze/5 to-bronze/0 pointer-events-none" />

          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-white text-xl font-bold tracking-widest hover:text-bronze transition-colors flex items-center gap-2 group"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white group-hover:from-bronze group-hover:to-bronze-light transition-all duration-300">
              AJ
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group
                    ${isActive ? 'text-bronze' : 'text-slate-300 hover:text-white'}
                  `}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-white/5 rounded-lg scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-10" />

                  {/* Active Indicator & Hover Underline */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-bronze rounded-full shadow-[0_0_8px_rgba(197,155,118,0.8)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute bottom-1 left-4 right-4 h-[2px] bg-white/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2 transition-colors relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="absolute inset-0 bg-white/5 rounded-lg scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
            {isMobileMenuOpen ? <X className="w-5 h-5 relative z-10" /> : <Menu className="w-5 h-5 relative z-10" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#020617]/90 md:hidden flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-sm bg-navy-card/50 border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col gap-4"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
                <span className="text-white font-bold tracking-widest">MENU</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-xl font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-between group
                      ${isActive ? 'bg-bronze/10 text-bronze border border-bronze/20' : 'text-slate-300 hover:bg-white/5 hover:text-white'}
                    `}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-bronze shadow-[0_0_8px_rgba(197,155,118,0.8)]" 
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
