'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ThreeDCarouselGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoRotateTimer = useRef<any>(null);

  // Fetch photos from Pexels (request 15 for a rich carousel)
  const { photos, loading, error } = usePexelsPhotos(15);

  const nextSlide = useCallback(() => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Auto-rotation logic
  useEffect(() => {
    if (!isHovered && photos.length > 0) {
      autoRotateTimer.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    };
  }, [isHovered, nextSlide, photos.length]);

  // Display logic: show 5 images (2 left, 1 center, 2 right)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
        indices.push((currentIndex + i + photos.length) % photos.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section 
      id="gallery" 
      className="relative py-32 bg-navy-base overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        {loading ? (
          <div className="flex justify-center items-center h-[500px]">
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-12 h-12 border-4 border-bronze border-t-transparent rounded-full"
            />
          </div>
        ) : error || photos.length === 0 ? (
          <div className="h-20" /> // Hidden fallback
        ) : (
          <>
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-16"
            >
              <span className="text-bronze font-mono tracking-widest text-sm uppercase mb-3 block">Perspective</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Photography Gallery</h2>
              <div className="w-24 h-1 bg-bronze mx-auto opacity-50" />
            </motion.div>

            {/* Carousel Container */}
            <div className="relative w-full flex items-center justify-center h-[450px] md:h-[550px] perspective-[1500px]">
              <div className="relative w-full max-w-4xl flex items-center justify-center h-full">
                <AnimatePresence initial={false}>
                  {visibleIndices.map((idx, i) => {
                    const position = i - 2; // -2, -1, 0, 1, 2
                    const photo = photos[idx];
                    const isCenter = position === 0;

                    return (
                      <motion.div
                        key={`${photo.id}-${idx}`}
                        initial={{ opacity: 0, scale: 0.8, x: position * 100 }}
                        animate={{
                          opacity: 1 - Math.abs(position) * 0.2,
                          scale: isCenter ? 1.1 : 0.85 - Math.abs(position) * 0.1,
                          x: position * (typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 250),
                          rotateY: position * -35,
                          z: isCenter ? 200 : -200 * Math.abs(position),
                          zIndex: 10 - Math.abs(position),
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={() => isCenter && setSelectedImage(photo.image)}
                        className={`absolute w-[280px] md:w-[400px] h-[350px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10 bg-navy-card
                          ${isCenter ? 'ring-2 ring-bronze/50' : ''}`}
                      >
                        <ImageWithFallback
                          src={photo.image}
                          alt={photo.photographer}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Shadow/Depth logic */}
                        <div className="absolute inset-0 bg-navy-base/10 group-hover:bg-transparent transition-colors duration-500" />
                        

                        {/* Reflection effect */}
                        <div className="absolute -bottom-[100%] left-0 right-0 h-full opacity-20 pointer-events-none scale-y-[-1] bg-gradient-to-t from-navy-base via-navy-base/20 to-transparent">
                          <ImageWithFallback
                            src={photo.thumbnail}
                            alt="reflection"
                            className="w-full h-full object-cover blur-sm"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 md:left-12 z-40 p-3 md:p-5 rounded-full bg-navy-card/80 backdrop-blur-md border border-white/10 text-bronze hover:bg-bronze hover:text-navy-base transition-all duration-300 shadow-lg hover:shadow-bronze/20"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 md:right-12 z-40 p-3 md:p-5 rounded-full bg-navy-card/80 backdrop-blur-md border border-white/10 text-bronze hover:bg-bronze hover:text-navy-base transition-all duration-300 shadow-lg hover:shadow-bronze/20"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* Indicator dots */}
            <div className="flex gap-2 mt-12 bg-navy-card/30 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
              {photos.slice(0, 7).map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex % 7 === i ? 'w-6 bg-bronze' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-base/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-8 right-8 p-4 bg-white/10 rounded-full hover:bg-white/20 hover:rotate-90 transition-all z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8 text-white" />
            </motion.button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              src={selectedImage}
              alt="Carousel Lightbox"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
