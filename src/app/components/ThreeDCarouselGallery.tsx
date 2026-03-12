'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ThreeDCarouselGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
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

  // Lightbox Navigation
  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    setIsZoomed(false);
  }, []);
  
  const lightboxNext = useCallback(() => {
    if (photos.length === 0) return;
    setIsZoomed(false);
    setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length]);

  const lightboxPrev = useCallback(() => {
    if (photos.length === 0) return;
    setIsZoomed(false);
    setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft') lightboxPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, closeLightbox, lightboxNext, lightboxPrev]);

  // Auto-rotation logic
  useEffect(() => {
    if (!isHovered && selectedImageIndex === null && photos.length > 0) {
      autoRotateTimer.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    };
  }, [isHovered, selectedImageIndex, nextSlide, photos.length]);

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
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="text-bronze font-mono tracking-widest text-sm uppercase mb-3 block">Perspective</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Photography Gallery</h2>
              <div className="w-24 h-1 bg-bronze mx-auto opacity-50" />
            </motion.div>

            {/* Carousel Container */}
            <div className="relative w-full flex items-center justify-center h-[450px] md:h-[550px] perspective-[1500px]">
              <motion.div
                className="relative w-full max-w-4xl flex items-center justify-center h-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) nextSlide();
                  else if (info.offset.x > threshold) prevSlide();
                }}
              >
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
                        onClick={() => isCenter && setSelectedImageIndex(idx)}
                        className={`absolute w-[280px] md:w-[400px] h-[350px] md:h-[450px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing group shadow-2xl border border-white/10 bg-navy-card
                          ${isCenter ? 'ring-2 ring-bronze/50' : ''}`}
                        style={{ willChange: 'transform' }}
                      >
                        <ImageWithFallback
                          src={photo.image}
                          alt={photo.photographer}
                          className="w-full h-full object-cover pointer-events-none"
                        />

                        {/* Shadow/Depth logic */}
                        <div className="absolute inset-0 bg-navy-base/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

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
              </motion.div>

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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex % 7 === i ? 'w-6 bg-bronze' : 'bg-white/20'
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && photos[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
            onClick={closeLightbox}
          >
            {/* Toolbar */}
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-[110] pointer-events-none">
              <p className="text-white/70 text-sm font-medium tracking-wide drop-shadow-md">
                {selectedImageIndex + 1} / {photos.length}
              </p>
              
              <div className="flex gap-4 pointer-events-auto">
                <motion.button
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  title={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5 text-white" /> : <ZoomIn className="w-5 h-5 text-white" />}
                </motion.button>

                <motion.button
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:rotate-90 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
            
            {/* Left/Right Controls */}
            <button
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              className="absolute left-4 md:left-12 z-[110] p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all duration-300 hidden md:flex"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              className="absolute right-4 md:right-12 z-[110] p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all duration-300 hidden md:flex"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Interactive Image Wrappers */}
            <motion.div 
              className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
              onClick={closeLightbox}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`lightbox-${selectedImageIndex}`}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className={`relative max-w-full max-h-full ${isZoomed ? 'cursor-move' : 'cursor-grab active:cursor-grabbing'}`}
                  onClick={(e) => e.stopPropagation()}
                  drag={isZoomed ? true : "x"}
                  dragConstraints={isZoomed ? undefined : { left: 0, right: 0 }}
                  dragElastic={isZoomed ? 0 : 0.2}
                  onDragEnd={(_, info) => {
                    if (isZoomed) return;
                    const threshold = 100;
                    if (info.offset.x < -threshold) lightboxNext();
                    else if (info.offset.x > threshold) lightboxPrev();
                  }}
                  whileTap={{ scale: isZoomed ? 1 : 0.98 }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                >
                  <motion.img
                    src={photos[selectedImageIndex].image}
                    alt={photos[selectedImageIndex].photographer}
                    animate={{ scale: isZoomed ? 2 : 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
                    draggable={false}
                  />
                  
                  {/* Image Metadata */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -bottom-10 md:bottom-auto md:top-auto md:-bottom-12 left-0 right-0 text-center pointer-events-none"
                  >
                    <p className="text-white/70 text-sm font-medium tracking-wide drop-shadow-md">
                      Photo by <span className="text-white">{photos[selectedImageIndex].photographer}</span>
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
