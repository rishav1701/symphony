"use client";

import Image from "next/image";
import { useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";
import { clsx } from "clsx";

type ArchImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Add the gold offset border frame */
  withFrame?: boolean;
  framed?: boolean;
  sizes?: string;
  priority?: boolean;
};

/**
 * Image component with rounded-arch top mask.
 * Falls back to PlaceholderImage if the image fails to load.
 */
export function ArchImage({
  src,
  alt,
  width,
  height,
  className,
  withFrame = false,
  framed = false,
  sizes,
  priority = false,
}: ArchImageProps) {
  const showFrame = withFrame || framed;
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={clsx("arch-mask", className)}>
        <PlaceholderImage
          name={src.split("/").pop()?.replace(/\.\w+$/, "") || "image"}
          width={width}
          height={height}
        />
      </div>
    );
  }

  const imageEl = (
    <div className={clsx("arch-mask", !showFrame && className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      />
    </div>
  );

  if (showFrame) {
    return (
      <div className={clsx("relative", className)}>
        {imageEl}
        <div
          className="absolute -bottom-4 -right-4 w-full h-full arch-mask border-2 border-gold -z-10"
          aria-hidden="true"
        />
      </div>
    );
  }

  return imageEl;
}
