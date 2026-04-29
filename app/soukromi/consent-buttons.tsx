"use client";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

const STORAGE_KEY = "cookie-consent";

export default function ConsentButtonsClient() {
  const [current, setCurrent] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") setCurrent(stored);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    posthog.opt_in_capturing();
    setCurrent("accepted");
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    posthog.opt_out_capturing();
    setCurrent("declined");
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <button
        onClick={accept}
        disabled={current === "accepted"}
        className="px-5 py-2 rounded-lg bg-forest text-warm-white font-semibold text-sm hover:bg-forest/90 transition-colors disabled:opacity-50"
      >
        Povolit analytické cookies
      </button>
      <button
        onClick={decline}
        disabled={current === "declined"}
        className="px-5 py-2 rounded-lg border border-dark/20 text-dark text-sm hover:border-dark/40 transition-colors disabled:opacity-50"
      >
        Odmítnout analytické cookies
      </button>
      {current && (
        <p className="text-sm text-dark/60">
          {current === "accepted" ? "Analytické cookies jsou povoleny." : "Analytické cookies jsou odmítnuty."}
        </p>
      )}
    </div>
  );
}
