"use client";

import { useState, useCallback, useEffect } from "react";

interface CardImageLightboxProps {
  children: React.ReactNode;
  src: string;
  alt: string;
}

export default function CardImageLightbox({ children, src, alt }: CardImageLightboxProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-zoom-in border-0 bg-transparent p-0 m-0"
        aria-label={`Enlarge ${alt}`}
      >
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fadeIn"
          onClick={close}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center
                       rounded-full border border-white/20 bg-black/50 text-white/70
                       hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Enlarged image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            />
            <p className="text-center text-white/50 text-sm mt-3 tracking-wider">
              {alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
