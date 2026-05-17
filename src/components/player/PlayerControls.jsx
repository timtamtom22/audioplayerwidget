import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { motion } from "framer-motion";

export default function PlayerControls({
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  audioRef
}) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(pct);
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [audioRef]);

  const handleSeek = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  }, []);

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border z-50"
    >
      <div
        ref={progressRef}
        onClick={handleSeek}
        className="h-1 w-full bg-secondary cursor-pointer relative"
      >
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">
          <p className="text-sm text-foreground">{track.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="p-2 text-muted hover:text-foreground">
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onPlayPause}
            className="p-3 bg-primary text-white rounded-sm"
          >
            {isPlaying ? <Pause /> : <Play className="ml-0.5" />}
          </button>

          <button onClick={onNext} className="p-2 text-muted hover:text-foreground">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
