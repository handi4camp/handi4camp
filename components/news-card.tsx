import Link from "next/link";

type NewsCardProps = {
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
  href: string;
};

export default function NewsCard({
  title,
  date,
  excerpt,
  coverImage,
  href,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-warm-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-light-green overflow-hidden">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-forest/30 text-sm font-serif">
            Handi4Camp
          </div>
        )}
      </div>
      <div className="p-6">
        <time className="text-xs text-dark/50 mb-2 block">
          {new Date(date).toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="font-serif text-lg font-bold text-dark group-hover:text-forest transition-colors mb-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-dark/70 line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
