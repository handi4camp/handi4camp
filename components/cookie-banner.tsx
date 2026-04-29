"use client";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      posthog.opt_in_capturing();
    } else if (stored === "declined") {
      posthog.opt_out_capturing();
    } else {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    posthog.opt_in_capturing();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    posthog.opt_out_capturing();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark border-t border-warm-white/10 px-4 py-4 sm:py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-sm text-warm-white/80 flex-1">
          Používáme analytické cookies (PostHog), abychom pochopili, jak web používáte. Žádné osobní údaje neprodáváme ani nesdílíme se třetími stranami.{" "}
          <Link href="/soukromi" className="underline text-warm-white hover:text-gold transition-colors">
            Zásady ochrany soukromí
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-lg border border-warm-white/30 text-warm-white/70 text-sm hover:border-warm-white/60 hover:text-warm-white transition-colors"
          >
            Odmítnout
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg bg-gold text-dark font-semibold text-sm hover:bg-gold/90 transition-colors"
          >
            Souhlasím
          </button>
        </div>
      </div>
    </div>
  );
}
