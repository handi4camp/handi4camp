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
    <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-8 snap-x snap-mandatory">
      {photos.map((photo, i) => {
        const deg = photo.rotation ?? (i % 2 === 0 ? -2 : 2);
        return (
          <div
            key={i}
            className="flex-none snap-center"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div className="bg-white p-3 pb-10 shadow-lg w-44 sm:w-52">
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
  );
}
