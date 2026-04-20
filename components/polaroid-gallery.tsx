"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type PolaroidPhoto = {
  src: string;
  alt: string;
  rotation?: number;
  videoSrc?: string;
};

export default function PolaroidGallery({
  photos,
  layout = "scroll",
}: {
  photos: PolaroidPhoto[];
  layout?: "scroll" | "grid";
}) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const slides = photos
    .filter((p) => p.src)
    .map((p) => ({ src: p.src, alt: p.alt }));

  const containerClass =
    layout === "grid"
      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 px-2 py-10"
      : "flex gap-8 px-6 sm:px-10 py-10";

  const wrapperClass =
    layout === "grid"
      ? ""
      : "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  const itemClass =
    layout === "grid"
      ? "transition-transform duration-300 ease-out hover:scale-105 hover:rotate-0 hover:z-10"
      : "flex-none snap-center transition-transform duration-300 ease-out hover:scale-105 hover:rotate-0 hover:z-10";

  return (
    <>
      <div className={wrapperClass}>
        <div className={containerClass}>
          {photos.map((photo, i) => {
            const deg = photo.rotation ?? (i % 2 === 0 ? -2 : 2);
            const slideIndex = slides.findIndex((s) => s.src === photo.src);
            return (
              <div
                key={i}
                data-card
                className={itemClass}
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className={`bg-white p-4 pb-14 shadow-xl ${layout === "grid" ? "w-full" : "w-64 sm:w-80"}`}>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-light-green relative group/photo">
                    {photo.src ? (
                      <button
                        type="button"
                        onClick={() => photo.videoSrc ? setVideoSrc(photo.videoSrc) : setLightboxIndex(slideIndex)}
                        className="w-full h-full cursor-pointer"
                        aria-label={photo.videoSrc ? `Přehrát video: ${photo.alt}` : `Otevřít foto: ${photo.alt}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                        />
                        {photo.videoSrc && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                              <svg className="w-6 h-6 text-white translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-forest/40 text-xs p-2 text-center">
                        {photo.alt}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />

      {videoSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setVideoSrc(null)}
        >
          <div className="relative max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-8 right-0 text-white/70 hover:text-white text-sm"
              onClick={() => setVideoSrc(null)}
            >
              Zavřít ✕
            </button>
            <video
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
