import { NextRequest, NextResponse } from "next/server";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { Resend } from "resend";
import path from "path";
import fs from "fs";
import { toSmlouvaPayload, toTemplateVariables } from "./template-data";
import { getPostHogClient } from "@/lib/posthog-server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const payload = toSmlouvaPayload(await req.json());
  const { nazev, adresa, email, castka, datum, typ } = payload;
  const identifikator = typ === "firma" ? payload.ico : payload.rc;

  if (!nazev || !adresa || !identifikator || !email || !castka || !datum) {
    return NextResponse.json(
      { error: "Chybí povinné údaje pro vystavení darovací smlouvy." },
      { status: 400 },
    );
  }

  const templatePath = path.join(process.cwd(), "public", "smlouva.docx");
  const content = fs.readFileSync(templatePath, "binary");

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
  doc.render(toTemplateVariables(payload));
  const buf = doc.toBuffer();

  const posthog = getPostHogClient();
  await Promise.all([
    resend.emails.send({
      from: "Handi4Camp <potvrzeni@handi4camp.cz>",
      to: [email],
      subject: "Vaše žádost o darovací smlouvu – Handi4Camp",
      html: `<p>Dobrý den ${nazev},</p>
<p>děkujeme za váš zájem! Vaše žádost o darovací smlouvu byla přijata a smlouvu vám zašleme co nejdříve.</p>
<p>V případě dotazů nás kontaktujte na <a href="mailto:info@handi4camp.cz">info@handi4camp.cz</a>.</p>
<p>S pozdravem,<br>tým Handi4Camp</p>`,
    }),
    resend.emails.send({
      from: "Handi4Camp web <potvrzeni@handi4camp.cz>",
      to: ["handi4camp@proton.me"],
      subject: `Žádost o darovací smlouvu – ${nazev}`,
      html: `<p>Nová žádost o darovací smlouvu:</p>
<ul>
  <li><strong>Typ dárce:</strong> ${typ === "firma" ? "Právnická osoba" : "Fyzická osoba"}</li>
  <li><strong>Jméno / Název firmy:</strong> ${nazev}</li>
  <li><strong>Adresa / Sídlo:</strong> ${adresa}</li>
  ${typ === "firma"
    ? `<li><strong>IČO:</strong> ${payload.ico || "—"}</li><li><strong>DIČ:</strong> ${payload.dic || "—"}</li>`
    : `<li><strong>Rodné číslo:</strong> ${payload.rc || "—"}</li>`}
  <li><strong>Výše daru:</strong> ${castka} Kč</li>
  <li><strong>Datum darování:</strong> ${datum}</li>
  <li><strong>E-mail dárce:</strong> ${email}</li>
</ul>
<p>Vyplněná smlouva je v příloze.</p>`,
      attachments: [{ filename: "smlouva-darovaci.docx", content: buf }],
    }),
  ]);

  posthog.capture({
    distinctId: email,
    event: "donation_contract_requested",
    properties: { donation_amount: castka },
  });
  await posthog.shutdown();

  return NextResponse.json({ ok: true });
}
