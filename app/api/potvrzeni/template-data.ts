export type PotvrzeniPayload = {
  jmeno: string;
  adresa: string;
  rcico: string;
  dic?: string;
  email: string;
  datum: string;
  dar: string;
  ucel: string;
};

function toText(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  return "";
}

function withDefaultCzk(value: string): string {
  const text = toText(value);

  if (!text) {
    return "";
  }

  if (/(kč|kc|czk)/i.test(text)) {
    return text;
  }

  return `${text} Kč`;
}

export function toPotvrzeniPayload(value: unknown): PotvrzeniPayload {
  const data = typeof value === "object" && value !== null ? value as Record<string, unknown> : {};

  return {
    jmeno: toText(data.jmeno),
    adresa: toText(data.adresa),
    rcico: toText(data.rcico),
    dic: toText(data.dic),
    email: toText(data.email),
    datum: toText(data.datum),
    dar: toText(data.dar),
    ucel: toText(data.ucel),
  };
}

export function toTemplateVariables(payload: PotvrzeniPayload) {
  return {
    jmeno: toText(payload.jmeno),
    adresa: toText(payload.adresa),
    rcico: toText(payload.rcico),
    dic: toText(payload.dic),
    datum: toText(payload.datum),
    dar: withDefaultCzk(payload.dar),
    ucel: toText(payload.ucel),
  };
}
