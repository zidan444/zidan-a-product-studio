import { useEffect, useRef, useState } from "react";
import { useInView } from "./Reveal";

// Neutral character set — editorial, not cyberpunk
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ·-/";

function scramble(text: string) {
  return text
    .split("")
    .map((char) => (char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join("");
}

export function DecodeText({ text, className }: { text: string; className?: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.1);
  // Start scrambled so users always see the decode effect when it appears
  const [displayText, setDisplayText] = useState(() => scramble(text));
  const decodedRef = useRef(false);

  // Only skip animation if the OS explicitly requests reduced motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(text);
      return undefined;
    }

    if (!visible) {
      decodedRef.current = false;
      setDisplayText(scramble(text));
      return undefined;
    }

    if (!decodedRef.current) {
      decodedRef.current = true;

      let interval: NodeJS.Timeout | null = null;
      const startTimeout = setTimeout(() => {
        let iteration = 0;
        const totalFrames = text.length * 6;

        interval = setInterval(() => {
          const lettersResolved = Math.floor(iteration / 4);

          setDisplayText(
            text
              .split("")
              .map((char, index) => {
                if (index < lettersResolved) return text[index];
                if (char === " ") return " ";
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("")
          );

          iteration++;
          if (iteration > totalFrames) {
            if (interval) clearInterval(interval);
            setDisplayText(text);
          }
        }, 55);
      }, 300);

      return () => {
        clearTimeout(startTimeout);
        if (interval) clearInterval(interval);
      };
    }

    return undefined;
  }, [visible, text, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
