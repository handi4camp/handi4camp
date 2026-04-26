import { NextRequest, NextResponse } from "next/server";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { Resend } from "resend";
import path from "path";
import fs from "fs";
import { toPotvrzeniPayload, toTemplateVariables } from "./template-data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const payload = toPotvrzeniPayload(await req.json());
  const { jmeno, adresa, rcico, dic, email, datum, dar, ucel } = payload;

  if (!jmeno || !adresa || !rcico || !email || !datum || !dar || !ucel) {
    return NextResponse.json(
      { error: "Chybí povinné údaje pro vystavení potvrzení." },
      { status: 400 },
    );
  }

  const templatePath = path.join(process.cwd(), "public", "potvrzeni.docx");
  const content = fs.readFileSync(templatePath, "binary");

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
  doc.render(toTemplateVariables(payload));
  const buf = doc.toBuffer();

  await Promise.all([
    resend.emails.send({
      from: "Handi4Camp <potvrzeni@handi4camp.cz>",
      to: [email],
      subject: "Vaše žádost o potvrzení o daru – Handi4Camp",
      html: `<p>Dobrý den ${jmeno},</p>
<p>děkujeme za váš dar! V příloze najdete vyplněný formulář pro daňové účely.</p>
<p>V případě dotazů nás kontaktujte na <a href="mailto:info@handi4camp.cz">info@handi4camp.cz</a>.</p>
<p>S pozdravem,<br>tým Handi4Camp</p>`,
      attachments: [{ filename: "potvrzeni-o-daru.docx", content: buf }],
    }),
    resend.emails.send({
      from: "Handi4Camp web <potvrzeni@handi4camp.cz>",
      to: ["handi4camp@proton.me"],
      subject: `Žádost o potvrzení o daru – ${jmeno}`,
      html: `<p>Nová žádost o potvrzení o daru:</p>
<ul>
  <li><strong>Jméno / Název firmy:</strong> ${jmeno}</li>
  <li><strong>Adresa / Sídlo:</strong> ${adresa}</li>
  <li><strong>Rodné číslo / IČO:</strong> ${rcico}</li>
  <li><strong>DIČ:</strong> ${dic || "—"}</li>
  <li><strong>Datum přijetí daru:</strong> ${datum}</li>
  <li><strong>Výše daru:</strong> ${dar}</li>
  <li><strong>Účel daru:</strong> ${ucel}</li>
  <li><strong>E-mail dárce:</strong> ${email}</li>
</ul>
<p>Vyplněný formulář je v příloze.</p>`,
      attachments: [{ filename: "potvrzeni-o-daru.docx", content: buf }],
    }),
  ]);

  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="potvrzeni-o-daru.docx"',
    },
  });
}
