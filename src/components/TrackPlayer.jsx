import { useState, useRef, useEffect } from "react";
import tracks from "../data/tracks";

import TrackList from "./player/TrackList";
import PlayerControls from "./player/PlayerControls";
import ExpandedPlayer from "./player/ExpandedPlayer";

export default function TrackPlayer() {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, activeTrack]);

  const handlePlayPause = () => setIsPlaying((p) => !p);

  const handleNext = () => {
    const i = tracks.findIndex((t) => t.id === activeTrack.id);
    setActiveTrack(tracks[(i + 1) % tracks.length]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const i = tracks.findIndex((t) => t.id === activeTrack.id);
    setActiveTrack(tracks[(i - 1 + tracks.length) % tracks.length]);
    setIsPlaying(true);
  };

  return (
    <>
      <audio ref={audioRef} src={activeTrack.audio_url} />

      <TrackList
        tracks={tracks}
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        isExpanded={isExpanded}
        onSelectTrack={(track) => {
          setActiveTrack(track);
          setIsExpanded(true);
          setIsPlaying(true);
        }}
      />

      <PlayerControls
        track={activeTrack}
        audioRef={audioRef}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {isExpanded && (
        <ExpandedPlayer track={activeTrack} onClose={() => setIsExpanded(false)} />
      )}
    </>
  );
}
