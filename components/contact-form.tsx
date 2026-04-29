"use client";
import { useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";

type Props = {
  type: "sponzor" | "dobrovolnik";
  buttonLabel: string;
  buttonClassName: string;
};

export default function ContactForm({ type, buttonLabel, buttonClassName }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ jmeno: "", email: "", zprava: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...form }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      posthog.capture("contact_form_submitted", { form_type: type });
    } catch (err) {
      posthog.captureException(err);
      alert("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          posthog.capture("contact_form_opened", { form_type: type });
        }}
        className={buttonClassName}
      >
        {buttonLabel}
      </button>
    );
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-forest/30 bg-light-green p-6 max-w-md">
        <p className="font-semibold text-dark mb-1">Zpráva odeslána!</p>
        <p className="text-sm text-dark/60">Ozveme se vám co nejdříve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-dark/10 bg-warm-white p-6 max-w-md space-y-4">
      <FormField label="Jméno / Název firmy" name="jmeno" value={form.jmeno} onChange={handleChange} required />
      <FormField label="Váš e-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-1">Zpráva (nepovinné)</label>
        <textarea
          name="zprava"
          value={form.zprava}
          onChange={handleChange}
          rows={3}
          className="w-full border border-dark/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest transition-colors bg-white resize-none"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-forest text-warm-white font-semibold py-2.5 rounded-lg hover:bg-forest/90 transition-colors text-sm disabled:opacity-60"
        >
          {loading ? "Odesílám…" : "Odeslat"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2.5 rounded-lg border border-dark/20 text-dark/60 hover:border-dark/40 transition-colors text-sm"
        >
          Zrušit
        </button>
      </div>
      <p className="text-xs text-dark/50 leading-relaxed">
        Údaje zpracováváme výhradně pro odpověď na váš dotaz (oprávněný zájem správce, čl. 6 odst. 1 písm. f GDPR).
        Správce: Rotary Club Valtice Břeclav ·{" "}
        <Link href="/soukromi" className="underline hover:text-dark/70 transition-colors">Zásady soukromí</Link>
      </p>
    </form>
  );
}

function FormField({ label, name, value, onChange, type = "text", required }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-dark/60 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-dark/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest transition-colors bg-white"
      />
    </div>
  );
}
