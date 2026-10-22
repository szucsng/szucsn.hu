"use client";

import { useEffect, useState } from "react";

/** True on phone-sized viewports, where heavy blur animations are too much for mobile Safari. */
export function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return isMobile;
}
