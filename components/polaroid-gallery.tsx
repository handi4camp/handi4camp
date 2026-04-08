"use client";
import { useEffect, useRef } from "react";

export type PolaroidPhoto = {
  src: string;
  alt: string;
  rotation?: number;
};

export default function PolaroidGallery({
  photos,
}: {
  photos: PolaroidPhoto[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isHovering.current) return;

      const cards = container.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards.length) return;

      indexRef.current = (indexRef.current + 1) % cards.length;
      const target = cards[indexRef.current];
      const containerLeft = container.getBoundingClientRect().left;
      const cardLeft = target.getBoundingClientRect().left;
      const offset = cardLeft - containerLeft + container.scrollLeft - (container.clientWidth - target.offsetWidth) / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; }}
    >
      <div className="flex gap-8 px-6 sm:px-10 py-10">
        {photos.map((photo, i) => {
          const deg = photo.rotation ?? (i % 2 === 0 ? -2 : 2);
          return (
            <div
              key={i}
              data-card
              className="flex-none snap-center transition-transform duration-300 ease-out hover:scale-105 hover:rotate-0 hover:z-10"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="bg-white p-4 pb-14 shadow-xl w-64 sm:w-80">
                <div className="aspect-[4/3] w-full overflow-hidden bg-light-green relative group/photo">
                  {photo.src ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover sepia-[.35] brightness-95 contrast-[1.05] saturate-[.85] transition-all duration-300 group-hover/photo:sepia-0 group-hover/photo:brightness-100 group-hover/photo:saturate-100"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover/photo:opacity-0"
                        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(60,40,10,0.35) 100%)" }}
                      />
                    </>
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
  );
}
