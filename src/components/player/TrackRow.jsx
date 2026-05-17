import React from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function TrackRow({ track, index, isActive, isPlaying, onSelect }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onSelect(track)}
      className={`w-full text-left group flex items-center gap-4 py-5 px-4 border-b border-border/50 hover:bg-secondary/40 transition ${
        isActive ? "bg-secondary/30" : ""
      }`}
    >
      <div className="w-8 flex-shrink-0 flex items-center justify-center">
        {isActive && isPlaying ? (
          <Pause className="w-4 h-4 text-primary" />
        ) : isActive ? (
          <Play className="w-4 h-4 text-primary" />
        ) : (
          <Play className="w-4 h-4 text-foreground opacity-40 group-hover:opacity-100" />
        )}
      </div>

      {track.thumbnail_url && (
        <img
          src={track.thumbnail_url}
          className="w-12 h-12 rounded-sm object-cover opacity-80 group-hover:opacity-100"
        />
      )}

      <div className="flex-1">
        <h3 className={`font-display text-lg truncate ${isActive ? "text-primary" : "text-foreground"}`}>
          {track.title}
        </h3>
        {track.description && (
          <p className="font-mono text-xs text-muted-foreground truncate">
            {track.description.slice(0, 40)}…
          </p>
        )}
      </div>
    </motion.button>
  );
}
