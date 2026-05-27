import Image from "next/image";

export type SponsorEntry = {
  name: string;
  logo?: string;
  website?: string;
};

export default function SponsorLogos({
  sponsors,
}: {
  sponsors: SponsorEntry[];
}) {
  return (
    <section className="py-12 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-widest text-dark/40 uppercase mb-8">
          Děkujeme našim partnerům
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.website ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={sponsor.name}
              className="text-dark/40 hover:text-dark transition-colors"
            >
              {sponsor.logo ? (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={0}
                  height={0}
                  sizes="160px"
                  className="h-10 w-auto grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="font-bold text-sm">{sponsor.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
