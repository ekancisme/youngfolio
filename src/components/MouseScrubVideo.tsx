import { useState } from "react";
import { useMouseScrubVideo } from "../hooks/useMouseScrubVideo";

const SOURCE = "/hero-scrub.mp4";

export function MouseScrubVideo({ reducedMotion }: { reducedMotion: boolean }) {
  const [failed, setFailed] = useState(false);
  const ref = useMouseScrubVideo(reducedMotion || failed);
  return (
    <div className={`visual-stage ${failed ? "visual-stage--fallback" : ""}`} aria-hidden="true">
      {!failed && <video ref={ref} className="hero-video" muted playsInline preload="auto" tabIndex={-1} onError={() => setFailed(true)} src={SOURCE} />}
      <div className="video-overlay" />
      <div className="film-grain" />
    </div>
  );
}
