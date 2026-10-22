"use client";

import { useState, useEffect } from "react";

export type ExifResult = {
  camera?: string;
  lens?: string;
  fNumber?: string;
  iso?: string;
  focalLength?: string;
  exposureTime?: string;
  date?: string;
  artist?: string;
  copyright?: string;
  software?: string;
  whiteBalance?: string;
  flash?: string;
  exposureProgram?: string;
  meteringMode?: string;
  gps?: string;
};

function formatExposure(value: number) {
  if (!Number.isFinite(value)) return undefined;
  if (value >= 1) return `${value}s`;
  return `1/${Math.round(1 / value)}s`;
}

function formatDate(value: unknown) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return undefined;
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

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

            const make = data.Make ? String(data.Make) : "";
            const model = data.Model ? String(data.Model) : "";
            const camera = model
              ? make && !model.startsWith(make)
                ? `${make} ${model}`
                : model
              : make || undefined;

            const artist =
              data.Artist || data.Creator || data.creator || data.Byline;

            const latitude =
              typeof data.latitude === "number" ? data.latitude : undefined;
            const longitude =
              typeof data.longitude === "number" ? data.longitude : undefined;

            setExif({
              camera,
              lens: data.LensModel || data.Lens || undefined,
              fNumber:
                data.FNumber != null ? `${data.FNumber}` : undefined,
              iso: data.ISO != null ? `${data.ISO}` : undefined,
              focalLength:
                data.FocalLength != null
                  ? `${Math.round(data.FocalLength)}mm`
                  : undefined,
              exposureTime:
                data.ExposureTime != null
                  ? formatExposure(Number(data.ExposureTime))
                  : undefined,
              date: formatDate(data.DateTimeOriginal || data.CreateDate),
              artist: artist ? String(artist) : undefined,
              copyright:
                data.Copyright || data.rights || data.CopyrightNotice
                  ? String(
                      data.Copyright || data.rights || data.CopyrightNotice,
                    )
                  : undefined,
              software:
                data.Software || data.CreatorTool
                  ? String(data.Software || data.CreatorTool)
                  : undefined,
              whiteBalance: data.WhiteBalance
                ? String(data.WhiteBalance)
                : undefined,
              flash: data.Flash ? String(data.Flash) : undefined,
              exposureProgram: data.ExposureProgram
                ? String(data.ExposureProgram)
                : undefined,
              meteringMode: data.MeteringMode
                ? String(data.MeteringMode)
                : undefined,
              gps:
                latitude !== undefined && longitude !== undefined
                  ? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
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
