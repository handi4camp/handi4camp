type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  tinaFields?: { title?: string; subtitle?: string };
};

export default function PageHero({ title, subtitle, imageSrc, tinaFields }: PageHeroProps) {
  return (
    <section className="relative py-20 bg-forest text-warm-white overflow-hidden">
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" data-tina-field={tinaFields?.title}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-warm-white/80 max-w-2xl" data-tina-field={tinaFields?.subtitle}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
