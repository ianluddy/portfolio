"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wait a frame for scroll restoration to complete
    const raf = requestAnimationFrame(() => {
      setMounted(true);

      const rect = el.getBoundingClientRect();
      // Already in or above viewport — show immediately
      if (rect.bottom <= 0 || rect.top < window.innerHeight) {
        setVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(el);
      // Store for cleanup
      el.dataset.observing = "true";
      (el as any)._observer = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      if ((el as any)._observer) {
        (el as any)._observer.disconnect();
      }
    };
  }, []);

  // Don't hide until after first frame (prevents flash on back navigation)
  if (!mounted) return <div ref={ref} className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
