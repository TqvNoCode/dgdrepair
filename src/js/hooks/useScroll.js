import { useState, useEffect } from 'react';

/**
 * Custom hook to detect scroll position and whether the page has scrolled past a threshold
 * @param {number} threshold - Scroll distance in pixels to trigger isScrolled
 * @returns {{ isScrolled: boolean, scrollY: number }}
 */
export function useScroll(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Run once on mount to handle initial scroll position (e.g., page refresh mid-scroll)
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrolled, scrollY };
}
