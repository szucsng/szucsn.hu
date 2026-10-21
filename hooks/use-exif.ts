"use client";

import { useState, useEffect } from "react";

type ExifResult = {
  fNumber?: string;
  iso?: string;
  focalLength?: string;
  exposureTime?: string;
};

export function useExif(src: string | undefined): ExifResult | null {
  const [exif, setExif] = useState<ExifResult | null>(null);

  useEffect(() => {
    if (!src) return;

    const ext = src.split(".").pop()?.toLowerCase();
    if (ext !== "jpg" && ext !== "jpeg") return;

    let cancelled = false;

    import("exifr")
      .then(({ default: exifr }) =>
        exifr
          .parse(src, true)
          .then((data) => {
            if (cancelled || !data) return;
            setExif({
              fNumber:
                data.FNumber != null ? `${data.FNumber}` : undefined,
              iso: data.ISO != null ? `${data.ISO}` : undefined,
              focalLength:
                data.FocalLength != null
                  ? `${Math.round(data.FocalLength)}mm`
                  : undefined,
              exposureTime:
                data.ExposureTime != null
                  ? data.ExposureTime >= 1
                    ? `${data.ExposureTime}s`
                    : `1/${Math.round(1 / data.ExposureTime)}s`
                  : undefined,
            });
          })
          .catch(() => {}),
      )
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [src]);

  return exif;
}
