import React, { useState, useEffect } from "react";

interface ChatEmptyStateProps {
  forceNight?: boolean;
}

const STARS = [
  { top: "12%", left: "18%", size: 2, delay: "0s", duration: "3s" },
  { top: "16%", left: "78%", size: 2.5, delay: "0.8s", duration: "2.4s" },
  { top: "26%", left: "12%", size: 1.5, delay: "1.5s", duration: "3.2s" },
  { top: "22%", left: "32%", size: 2, delay: "0.3s", duration: "2.8s" },
  { top: "32%", left: "86%", size: 3, delay: "1.1s", duration: "3.5s" },
  { top: "44%", left: "16%", size: 2, delay: "2.0s", duration: "2.6s" },
  { top: "50%", left: "82%", size: 1.5, delay: "0.5s", duration: "3.1s" },
  { top: "66%", left: "20%", size: 2.5, delay: "1.7s", duration: "2.9s" },
  { top: "70%", left: "76%", size: 2, delay: "0.2s", duration: "3.4s" },
  { top: "80%", left: "32%", size: 1.5, delay: "1.4s", duration: "2.7s" },
  { top: "78%", left: "68%", size: 2, delay: "2.2s", duration: "3.0s" },
  { top: "24%", left: "68%", size: 2, delay: "1.9s", duration: "2.5s" },
];

export function ChatEmptyState({ forceNight = false }: ChatEmptyStateProps) {
  const [isNight, setIsNight] = useState<boolean>(() => {
    if (forceNight) return true;
    if (typeof window !== "undefined") {
      const h = new Date().getHours();
      return h >= 21 || h < 5;
    }
    return false;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (forceNight) {
      setIsNight(true);
      return;
    }

    const update = () => {
      const h = new Date().getHours();
      setIsNight(h >= 21 || h < 5);
    };
    update();
    const interval = setInterval(update, 60000);

    const checkDark = () => {
      setIsDarkMode(
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark")
      );
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [forceNight]);

  const showNightAtmosphere = isNight || isDarkMode;

  return (
    <div className="relative flex flex-col items-center justify-center text-center select-none w-full mx-auto">
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1.3); filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)); }
        }
      `}</style>

      {showNightAtmosphere && isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-1000 opacity-90 dark:opacity-100">
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `starTwinkle ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto px-4">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight text-center w-full">
          How can I help you today?
        </div>
      </div>
    </div>
  );
}

export default ChatEmptyState;