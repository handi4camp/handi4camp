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
  return (
    /* Outer wrapper: clips x-scroll but allows y-overflow for shadows */
    <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-8 px-6 sm:px-10 py-10">
        {photos.map((photo, i) => {
          const deg = photo.rotation ?? (i % 2 === 0 ? -2 : 2);
          return (
            <div
              key={i}
              className="flex-none snap-center transition-transform duration-300 ease-out hover:scale-105 hover:rotate-0 hover:z-10"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="bg-white p-4 pb-14 shadow-xl w-64 sm:w-80">
                <div className="aspect-[4/3] w-full overflow-hidden bg-light-green">
                  {photo.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
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
