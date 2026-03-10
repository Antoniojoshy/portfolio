import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { galleryImages } from '../data/galleryData';
import { usePexelsPhotos } from '../../hooks/usePexelsPhotos';

interface LocalPhoto {
  id: number;
  url: string;
  alt: string;
  category: string;
  photographer?: string;
  photographer_url?: string;
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // TOGGLE: Set to true to use Pexels API, false for local data
  const usePexelsGallery = true;

  // Pexels Hook (fetches from d7fuwai collection)
  const { photos: pexelsPhotos, loading: pexelsLoading, error: pexelsError } = usePexelsPhotos(40);

  const categories = useMemo(() => {
    if (usePexelsGallery) return ['All'];
    return ['All', ...new Set(galleryImages.map(img => img.category))];
  }, [usePexelsGallery]);

  const displayPhotos = useMemo<LocalPhoto[]>(() => {
    if (usePexelsGallery) {
      return pexelsPhotos.map(p => ({
        id: p.id,
        url: p.image,
        alt: `Photo by ${p.photographer} on Pexels`,
        category: 'Pexels',
        photographer: p.photographer,
        photographer_url: p.photographerUrl
      }));
    }

    return activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter(img => img.category === activeCategory);
  }, [usePexelsGallery, pexelsPhotos, activeCategory]);

  return (
    <section id="gallery" className="relative py-32 bg-navy-base overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-bronze rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-bronze-light rounded-full blur-[120px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Photography Gallery
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-bronze to-bronze-light mx-auto mb-6" />
          <p className="text-slate-text text-lg max-w-2xl mx-auto mb-10">
            {usePexelsGallery
              ? "Curated highlights from my Pexels collection."
              : "Capturing moments through the lens. Use the filters below to explore different categories."}
          </p>

          {/* Category Filters (Only for local mode) */}
          {!usePexelsGallery && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full border transition-all duration-300 ${activeCategory === category
                      ? 'bg-bronze border-bronze text-navy-base font-bold shadow-lg shadow-bronze/20'
                      : 'bg-navy-surface/50 border-navy-card text-slate-text hover:border-bronze/50'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {usePexelsGallery && pexelsLoading && (
          <div className="flex justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-bronze border-t-transparent rounded-full"
            />
          </div>
        )}

        {usePexelsGallery && pexelsError && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{pexelsError}</p>
            <p className="text-slate-text text-sm italic">Note: Make sure your Pexels API Key is set in the .env file.</p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {!pexelsLoading && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Masonry columnsCount={3} gutter="1.5rem" className="w-full">
                {displayPhotos.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative group cursor-pointer overflow-hidden rounded-xl bg-navy-card/30"
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <div className="aspect-auto overflow-hidden">
                      <ImageWithFallback
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-navy-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="text-center w-full"
                      >
                        <ZoomIn className="w-10 h-10 text-bronze mb-3 mx-auto" />
                        {image.photographer && (
                          <p className="text-white text-xs font-medium tracking-tight mb-1 opacity-80">
                            Photo by <span className="text-bronze">{image.photographer}</span> on Pexels
                          </p>
                        )}
                        <span className="text-white text-[10px] font-bold tracking-widest uppercase bg-bronze/20 px-3 py-1 rounded-full border border-bronze/30">
                          {usePexelsGallery ? "Collection" : image.category}
                        </span>
                      </motion.div>
                    </div>

                    {/* Decorative corner glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-bronze/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </Masonry>
            </motion.div>
          )}
        </AnimatePresence>

        {displayPhotos.length === 0 && !pexelsLoading && (
          <div className="text-center py-20">
            <p className="text-slate-text italic">No images found.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-base/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
