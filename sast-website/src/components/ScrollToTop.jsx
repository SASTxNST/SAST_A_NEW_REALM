import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll position on every route change — expected behavior
// for a real multi-page site, easy to lose with client-side routing.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
