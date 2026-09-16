import { useEffect, useRef } from "react";

const FOLLOW_STRENGTH = 0.5;
const SNAP_THRESHOLD = 1 / 240;
const MIN_SEEK_INTERVAL = 1000 / 30;

export function useMouseScrubVideo(disabled: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const renderedTime = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const lastSeekAt = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || disabled) return;

    const scrubArea = video.closest<HTMLElement>(".hero");

    const renderFrame = (now: number) => {
      animationFrame.current = null;
      if (video.readyState < 2 || !Number.isFinite(video.duration)) return;

      const difference = targetTime.current - renderedTime.current;

      if (Math.abs(difference) <= SNAP_THRESHOLD) {
        renderedTime.current = targetTime.current;
        return;
      }

      if (now - lastSeekAt.current >= MIN_SEEK_INTERVAL) {
        renderedTime.current += difference * FOLLOW_STRENGTH;
        lastSeekAt.current = now;
        video.currentTime = renderedTime.current;
      }

      animationFrame.current = requestAnimationFrame(renderFrame);
    };

    const requestRender = () => {
      if (animationFrame.current === null) animationFrame.current = requestAnimationFrame(renderFrame);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !Number.isFinite(video.duration)) return;
      const pointerProgress = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      targetTime.current = pointerProgress * video.duration;
      requestRender();
    };

    const initialize = () => {
      const initialTime = video.duration * 0.5;
      targetTime.current = initialTime;
      renderedTime.current = initialTime;
      video.currentTime = initialTime;
    };

    if (scrubArea) scrubArea.addEventListener("pointermove", onPointerMove, { passive: true });
    else window.addEventListener("pointermove", onPointerMove, { passive: true });
    video.addEventListener("loadeddata", initialize);
    if (video.readyState >= 2) initialize();

    return () => {
      if (scrubArea) scrubArea.removeEventListener("pointermove", onPointerMove);
      else window.removeEventListener("pointermove", onPointerMove);
      video.removeEventListener("loadeddata", initialize);
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    };
  }, [disabled]);

  return videoRef;
}