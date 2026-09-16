import { useEffect, useState } from "react";

type Options = { text: string; speed?: number; startDelay?: number; reducedMotion?: boolean };

export function useTypewriter({ text, speed = 38, startDelay = 600, reducedMotion = false }: Options) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    setDisplayed("");
    setDone(false);
    const delay = window.setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(delay);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, reducedMotion]);

  return reducedMotion ? { displayed: text, done: true } : { displayed, done };
}