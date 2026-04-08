import PageHero from "@/components/page-hero";

export default function KontaktPage() {
  return (
    <>
      <PageHero title="Kontakt" subtitle="Máte otázku? Rádi vám odpovíme." />

      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Kontaktní info */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">
                Spojte se s námi
              </h2>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">
                    Organizátorka
                  </dt>
                  <dd className="text-dark font-medium">Barbora Slátková</dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">
                    Email
                  </dt>
                  <dd>
                    <a
                      href="mailto:info@handi4camp.cz"
                      className="text-forest hover:text-dark transition-colors"
                    >
                      info@handi4camp.cz
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">
                    Záštita
                  </dt>
                  <dd>
                    <a
                      href="https://rotary.cz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest hover:text-dark transition-colors"
                    >
                      Rotary Club Valtice Břeclav
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Formulář — mailto fallback */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">
                Napište nám
              </h2>
              <form
                action="mailto:info@handi4camp.cz"
                method="post"
                encType="text/plain"
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1"
                  >
                    Jméno
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
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1"
                  >
                    Email
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
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1"
                  >
                    Zpráva
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
                >
                  Odeslat zprávu →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
