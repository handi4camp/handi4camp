export type SmlouvaPayload = {
  nazev: string;
  adresa: string;
  ico: string;
  dic?: string;
  castka: string;
  datum: string;
  email: string;
};

function toText(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}

const ONES = ["", "jeden", "dva", "tři", "čtyři", "pět", "šest", "sedm", "osm", "devět",
  "deset", "jedenáct", "dvanáct", "třináct", "čtrnáct", "patnáct", "šestnáct",
  "sedmnáct", "osmnáct", "devatenáct"];
const TENS = ["", "", "dvacet", "třicet", "čtyřicet", "padesát", "šedesát", "sedmdesát", "osmdesát", "devadesát"];
const HUNDREDS = ["", "sto", "dvě stě", "tři sta", "čtyři sta", "pět set",
  "šest set", "sedm set", "osm set", "devět set"];

function belowThousand(n: number): string {
  if (n === 0) return "";
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const remainder = n % 100;
  if (h > 0) parts.push(HUNDREDS[h]);
  if (remainder < 20) {
    if (remainder > 0) parts.push(ONES[remainder]);
  } else {
    const t = Math.floor(remainder / 10);
    const o = remainder % 10;
    parts.push(TENS[t]);
    if (o > 0) parts.push(ONES[o]);
  }
  return parts.join(" ");
}

export function numberToCzechWords(n: number): string {
  if (n === 0) return "nula";
  if (!Number.isInteger(n) || n < 0 || n > 9_999_999) {
    return String(n);
  }

  const parts: string[] = [];

  const millions = Math.floor(n / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1_000);
  const remainder = n % 1_000;

  if (millions > 0) {
    const w = belowThousand(millions);
    if (millions === 1) parts.push("jeden milion");
    else if (millions >= 2 && millions <= 4) parts.push(`${w} miliony`);
    else parts.push(`${w} milionů`);
  }

  if (thousands > 0) {
    if (thousands === 1) {
      parts.push("jeden tisíc");
    } else if (thousands >= 2 && thousands <= 4) {
      parts.push(`${belowThousand(thousands)} tisíce`);
    } else {
      parts.push(`${belowThousand(thousands)} tisíc`);
    }
  }

  if (remainder > 0) {
    parts.push(belowThousand(remainder));
  }

  return parts.join(" ");
}

export function toSmlouvaPayload(value: unknown): SmlouvaPayload {
  const data = typeof value === "object" && value !== null ? value as Record<string, unknown> : {};
  return {
    nazev: toText(data.nazev),
    adresa: toText(data.adresa),
    ico: toText(data.ico),
    dic: toText(data.dic),
    castka: toText(data.castka),
    datum: toText(data.datum),
    email: toText(data.email),
  };
}

export function toTemplateVariables(payload: SmlouvaPayload) {
  const castkaNum = parseInt(payload.castka.replace(/\s/g, ""), 10);
  const castkaFormatted = isNaN(castkaNum)
    ? payload.castka
    : new Intl.NumberFormat("cs-CZ").format(castkaNum);

  return {
    nazev: payload.nazev,
    adresa: payload.adresa,
    ico: payload.ico,
    dic: payload.dic ?? "",
    castka_cislem: castkaFormatted,
    castka_slovy: isNaN(castkaNum) ? payload.castka : numberToCzechWords(castkaNum),
    datum: payload.datum,
  };
}
