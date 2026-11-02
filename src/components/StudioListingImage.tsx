"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export default function StudioListingImage({ src, alt }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-52 w-full overflow-hidden bg-muted">
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOff className="h-10 w-10" />
          <p className="text-sm">Image not available</p>
        </div>
      )}
    </div>
  );
}