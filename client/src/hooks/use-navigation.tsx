import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * A hook that scrolls to the top of the page when the location changes.
 */
export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
} 