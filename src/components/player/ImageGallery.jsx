import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: { duration: 0.4 },
  },
};

export default function ImageGallery({ images, trackTitle }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <AnimatePresence mode="wait">
        {images.map((url, index) => (
          <motion.div
            key={`${trackTitle}-${index}`}
            custom={index}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative overflow-hidden rounded-sm ${
              index === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
          >
            <div className={`relative ${index === 0 ? 'aspect-video' : 'aspect-[4/3]'}`}>
              <img
                src={url}
                alt={`Visual from ${trackTitle} — image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Film grain overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}