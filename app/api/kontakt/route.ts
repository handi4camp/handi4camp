import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBJECTS: Record<string, string> = {
  sponzor: "Zájem o sponzoring – Handi4Camp web",
  dobrovolnik: "Zájem o dobrovolnictví – Handi4Camp web",
};

const LABELS: Record<string, string> = {
  sponzor: "sponzora / partnera",
  dobrovolnik: "dobrovolníka / asistenta",
};

export async function POST(req: NextRequest) {
  const { type, jmeno, email, zprava } = await req.json();

  if (!type || !jmeno || !email) {
    return NextResponse.json({ error: "Chybí povinná pole." }, { status: 400 });
  }

  const subject = SUBJECTS[type] ?? "Nová zpráva – Handi4Camp web";
  const label = LABELS[type] ?? type;

  await resend.emails.send({
    from: "Handi4Camp web <potvrzeni@handi4camp.cz>",
    to: ["handi4camp@proton.me"],
    replyTo: email,
    subject,
    html: `<p>Nová zpráva od ${label}:</p>
<ul>
  <li><strong>Jméno / Firma:</strong> ${jmeno}</li>
  <li><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></li>
  ${zprava ? `<li><strong>Zpráva:</strong> ${zprava}</li>` : ""}
</ul>`,
  });

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: email,
    event: "contact_message_sent",
    properties: { contact_type: type, has_message: !!zprava },
  });
  await posthog.shutdown();

  return NextResponse.json({ ok: true });
}
