import React from "react";
import { motion } from "framer-motion";
import TrackRow from "./TrackRow";

export default function TrackList({ tracks, activeTrack, isPlaying, onSelectTrack, isExpanded }) {
  return (
    <motion.div
      animate={{
        opacity: isExpanded ? 0.3 : 1,
        scale: isExpanded ? 0.97 : 1,
        filter: isExpanded ? "blur(2px)" : "blur(0px)"
      }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="px-4 md:px-8 py-6">
        <h1 className="font-display text-3xl text-foreground tracking-tight">Tracks</h1>
      </div>

      <div className="border-t border-border/50">
        {tracks.map((track, index) => (
          <TrackRow
            key={track.id}
            track={track}
            index={index}
            isActive={activeTrack.id === track.id}
            isPlaying={isPlaying && activeTrack.id === track.id}
            onSelect={onSelectTrack}
          />
        ))}
      </div>
    </motion.div>
  );
}
