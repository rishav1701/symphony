"use client";

import Image from "next/image";
import { useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

type VenueImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Standard image component with PlaceholderImage fallback.
 * Uses next/image with real alt text and sizes.
 */
export function VenueImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: VenueImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <PlaceholderImage
        name={src.split("/").pop()?.replace(/\.\w+$/, "") || "image"}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      onError={() => setHasError(true)}
      priority={priority}
      sizes={sizes}
    />
  );
}
