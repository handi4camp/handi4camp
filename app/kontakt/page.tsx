"use client";
import { useState, useEffect } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import PageHero from "@/components/page-hero";

type KontaktQuery = Awaited<ReturnType<typeof client.queries.kontakt>>;

export default function KontaktPage() {
  const [tinaData, setTinaData] = useState<KontaktQuery | null>(null);

  useEffect(() => {
    client.queries.kontakt({ relativePath: "kontakt.md" }).then(setTinaData);
  }, []);

  if (!tinaData) return null;
  return <KontaktContent tinaData={tinaData} />;
}

function KontaktContent({ tinaData }: { tinaData: KontaktQuery }) {
  const { data } = useTina(tinaData);
  const p = data.kontakt;

  return (
    <>
      <PageHero
        title={p.heroTitle ?? ""}
        subtitle={p.heroSubtitle ?? ""}
        tinaFields={{ title: tinaField(p, 'heroTitle'), subtitle: tinaField(p, 'heroSubtitle') }}
      />

      <section className="py-16 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold mb-10 text-center" data-tina-field={tinaField(p, 'contactHeading')}>
            {p.contactHeading}
          </h2>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {p.organizerPhoto && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.organizerPhoto}
                alt={p.organizerName ?? "Organizátorka"}
                className="w-48 h-48 rounded-2xl object-cover shadow-lg flex-shrink-0 mx-auto md:mx-0"
                data-tina-field={tinaField(p, 'organizerPhoto')}
              />
            )}

            <div className="flex-1">
              <h3 className="font-serif text-2xl font-bold mb-1" data-tina-field={tinaField(p, 'organizerName')}>
                {p.organizerName}
              </h3>
              {p.organizerRole && (
                <p className="text-dark/50 text-sm mb-6" data-tina-field={tinaField(p, 'organizerRole')}>
                  {p.organizerRole}
                </p>
              )}

              <dl className="space-y-4 text-sm">
                {p.phone && (
                  <div className="flex items-center gap-3">
                    <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest w-20">Telefon</dt>
                    <dd>
                      <a href={`tel:${p.phone}`} className="text-forest hover:text-dark transition-colors" data-tina-field={tinaField(p, 'phone')}>
                        {p.phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest w-20">Email</dt>
                  <dd>
                    <a href={`mailto:${p.email ?? ""}`} className="text-forest hover:text-dark transition-colors" data-tina-field={tinaField(p, 'email')}>
                      {p.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest w-20">Facebook</dt>
                  <dd>
                    <a
                      href={p.facebookHref ?? "https://www.facebook.com/Handi4Camp"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-forest hover:text-dark transition-colors"
                      data-tina-field={tinaField(p, 'facebookLabel')}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/facebook.svg" alt="" className="w-4 h-4" />
                      {p.facebookLabel}
                    </a>
                  </dd>
                </div>
                {p.instagramHref && (
                  <div className="flex items-center gap-3">
                    <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest w-20">Instagram</dt>
                    <dd>
                      <a
                        href={p.instagramHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-forest hover:text-dark transition-colors"
                        data-tina-field={tinaField(p, 'instagramLabel')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                        {p.instagramLabel}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-light-green text-center">
            <p className="text-dark/50 text-sm mb-2">Pořádáme pod záštitou</p>
            <a
              href={p.affiliationHref ?? "https://rotary.cz"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest font-semibold hover:text-dark transition-colors"
              data-tina-field={tinaField(p, 'affiliationLabel')}
            >
              {p.affiliationLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
