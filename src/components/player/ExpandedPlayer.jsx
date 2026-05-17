import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImageGallery from "./ImageGallery";

export default function ExpandedPlayer({ track, onClose }) {
  if (!track) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 overflow-y-auto"
      >
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="p-3 bg-secondary rounded-sm">
            <X />
          </button>
        </div>

        <div className="px-6 pb-10">
          <h2 className="text-4xl font-display">{track.title}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            {track.description}
          </p>

          <div className="mt-8">
            <ImageGallery images={track.images} trackTitle={track.title} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
