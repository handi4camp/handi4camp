"use client";
import { useState, useEffect } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import PageHero from "@/components/page-hero";

type NapsaliQuery = Awaited<ReturnType<typeof client.queries.napsali>>;

export default function NapsaliClient() {
  const [tinaData, setTinaData] = useState<NapsaliQuery | null>(null);

  useEffect(() => {
    client.queries.napsali({ relativePath: "napsali-o-nas.md" }).then(setTinaData);
  }, []);

  if (!tinaData) return null;
  return <NapsaliContent tinaData={tinaData} />;
}

function NapsaliContent({ tinaData }: { tinaData: NapsaliQuery }) {
  const { data } = useTina(tinaData);
  const p = data.napsali;

  return (
    <>
      <PageHero
        title={p.heroTitle ?? ""}
        subtitle={p.heroSubtitle ?? ""}
        tinaFields={{ title: tinaField(p, "heroTitle"), subtitle: tinaField(p, "heroSubtitle") }}
      />

      <section className="py-16 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-tina-field={tinaField(p, "mentions")}
          >
            {p.mentions?.map((item, i) => (
              item && (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm border border-light-green/30 p-6 flex flex-col gap-3"
                >
                  {item.date && (
                    <span className="text-xs font-semibold text-dark/40 uppercase tracking-widest">
                      {item.date}
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-bold text-dark leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-dark/70 leading-relaxed flex-1">
                      {item.description}
                    </p>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 bg-gold text-dark font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors self-start"
                    >
                      Číst
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
                      </svg>
                    </a>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
