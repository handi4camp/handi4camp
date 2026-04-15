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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6" data-tina-field={tinaField(p, 'contactHeading')}>{p.contactHeading}</h2>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Organizátorka</dt>
                  <dd className="text-dark font-medium" data-tina-field={tinaField(p, 'organizerName')}>{p.organizerName}</dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Email</dt>
                  <dd>
                    <a href={`mailto:${p.email ?? ""}`} className="text-forest hover:text-dark transition-colors" data-tina-field={tinaField(p, 'email')}>
                      {p.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Facebook</dt>
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
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Záštita</dt>
                  <dd>
                    <a
                      href={p.affiliationHref ?? "https://rotary.cz"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest hover:text-dark transition-colors"
                      data-tina-field={tinaField(p, 'affiliationLabel')}
                    >
                      {p.affiliationLabel}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-6" data-tina-field={tinaField(p, 'formHeading')}>{p.formHeading}</h2>
              <form
                action={`mailto:${p.email ?? ""}`}
                method="post"
                encType="text/plain"
                className="space-y-4"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1" data-tina-field={tinaField(p, 'formNameLabel')}>
                    {p.formNameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-dark/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1" data-tina-field={tinaField(p, 'formEmailLabel')}>
                    {p.formEmailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-dark/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1" data-tina-field={tinaField(p, 'formMessageLabel')}>
                    {p.formMessageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-dark/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest text-warm-white font-bold py-3 rounded-lg hover:bg-forest/90 transition-colors"
                  data-tina-field={tinaField(p, 'formSubmitLabel')}
                >
                  {p.formSubmitLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
