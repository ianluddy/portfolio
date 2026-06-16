"use client";

import { useEffect, useRef } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

// Adjust FLIP_DURATION (ms per tile cycle) and STAGGER (ms between tiles) here
const FLIP_DURATION = 80;
const STAGGER = 40;
const CYCLES = 10; // random flips before settling

interface FlipBoardProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

export function FlipBoard({ text, className = "", onComplete }: FlipBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = text.toUpperCase().split("");
    container.innerHTML = "";

    const tiles: HTMLElement[] = chars.map((finalChar) => {
      const tile = document.createElement("span");
      tile.className = "flip-tile";
      tile.setAttribute("aria-hidden", "true");

      const inner = document.createElement("span");
      inner.className = "flip-tile-inner";

      const top = document.createElement("span");
      top.className = "flip-half flip-top";

      const bottom = document.createElement("span");
      bottom.className = "flip-half flip-bottom";

      // Placeholder character
      top.textContent = " ";
      bottom.textContent = " ";

      inner.appendChild(top);
      inner.appendChild(bottom);
      tile.appendChild(inner);

      // Reserve space for the final character width
      tile.dataset.final = finalChar;

      return tile;
    });

    // Invisible text for accessibility / layout width
    const srText = document.createElement("span");
    srText.className = "sr-only";
    srText.textContent = text;
    container.appendChild(srText);

    tiles.forEach((tile) => container.appendChild(tile));

    let completedTiles = 0;

    tiles.forEach((tile, i) => {
      const finalChar = tile.dataset.final as string;
      const top = tile.querySelector(".flip-top") as HTMLElement;
      const bottom = tile.querySelector(".flip-bottom") as HTMLElement;

      let cycle = 0;
      const totalCycles = CYCLES + i; // later tiles run longer

      const flip = () => {
        if (cycle >= totalCycles) {
          // Settle on final character
          top.textContent = finalChar;
          bottom.textContent = finalChar;
          top.style.transform = "";
          bottom.style.transform = "";
          tile.classList.add("flip-settled");

          completedTiles++;
          if (completedTiles === tiles.length) onComplete?.();
          return;
        }

        const char = CHARSET[Math.floor(Math.random() * CHARSET.length)];

        // Animate top half folding down
        top.textContent = char;
        bottom.textContent = char;
        top.style.transition = `transform ${FLIP_DURATION * 0.5}ms ease-in`;
        top.style.transform = "rotateX(-90deg)";

        setTimeout(() => {
          // Swap to next char on the bottom half
          const nextChar =
            cycle === totalCycles - 1
              ? finalChar
              : CHARSET[Math.floor(Math.random() * CHARSET.length)];
          bottom.textContent = nextChar;
          top.textContent = nextChar;
          top.style.transition = "none";
          top.style.transform = "rotateX(0deg)";

          bottom.style.transition = `transform ${FLIP_DURATION * 0.5}ms ease-out`;
          bottom.style.transform = "rotateX(90deg)";

          setTimeout(() => {
            bottom.style.transition = "none";
            bottom.style.transform = "";
            cycle++;
            flip();
          }, FLIP_DURATION * 0.5);
        }, FLIP_DURATION * 0.5);
      };

      setTimeout(flip, i * STAGGER);
    });
  }, [text, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`flip-board ${className}`}
      aria-label={text}
    />
  );
}
