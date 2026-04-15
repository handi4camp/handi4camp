import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Aktuality",
        path: "content/posts",
        fields: [
          { type: "string", name: "title", label: "Nadpis", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Datum publikace", required: true },
          { type: "image", name: "coverImage", label: "Titulní fotka" },
          { type: "string", name: "excerpt", label: "Krátký popis", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Obsah", isBody: true },
        ],
        ui: { router: ({ document }) => `/galerie/${document._sys.filename}` },
      },
      {
        name: "gallery",
        label: "Galerie",
        path: "content/gallery",
        fields: [
          { type: "number", name: "year", label: "Rok ročníku", required: true },
          { type: "string", name: "description", label: "Popis ročníku" },
          { type: "image", name: "photos", label: "Fotky", list: true },
        ],
      },
      {
        name: "sponsor",
        label: "Sponzoři",
        path: "content/sponsors",
        fields: [
          { type: "string", name: "name", label: "Název", isTitle: true, required: true },
          { type: "image", name: "logo", label: "Logo" },
          { type: "string", name: "website", label: "Web URL" },
          { type: "string", name: "tier", label: "Úroveň partnerství", options: ["gold", "silver", "partner"] },
          { type: "boolean", name: "active", label: "Zobrazit na webu" },
        ],
      },
      {
        name: "milestone",
        label: "Milníky",
        path: "content/milestones",
        fields: [
          { type: "number", name: "year", label: "Rok", required: true },
          { type: "string", name: "title", label: "Název milníku", required: true },
          { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
        ],
      },
      // ── Page singleton collections ──────────────────────────────────────
      {
        name: "home",
        label: "Úvodní stránka",
        path: "content/pages",
        match: { include: "home" },
        fields: [
          { type: "string", name: "heroHeadline", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtext", label: "Hero — Podnadpis", ui: { component: "textarea" } },
          { type: "string", name: "heroCta1Label", label: "Hero — CTA 1 text" },
          { type: "string", name: "heroCta1Href", label: "Hero — CTA 1 odkaz" },
          { type: "string", name: "heroCta2Label", label: "Hero — CTA 2 text" },
          { type: "string", name: "heroCta2Href", label: "Hero — CTA 2 odkaz" },
          { type: "string", name: "storyHeading", label: "Příběh — Nadpis" },
          { type: "string", name: "storyBody", label: "Příběh — Text", ui: { component: "textarea" } },
          { type: "string", name: "storyQuote", label: "Příběh — Citát", ui: { component: "textarea" } },
          { type: "string", name: "storyQuoteAuthor", label: "Příběh — Autor citátu" },
          { type: "string", name: "storyLinkLabel", label: "Příběh — Odkaz text" },
          { type: "string", name: "photoStripHeading", label: "Fotopás — Nadpis" },
          { type: "string", name: "rozcestnikHeading", label: "Rozcestník — Nadpis" },
          { type: "string", name: "rozcestnikSubheading", label: "Rozcestník — Podnadpis" },
          {
            type: "object",
            name: "rozcestnikCards",
            label: "Rozcestník — Karty",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Název" },
              { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
            ],
          },
        ],
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "okempu",
        label: "O kempu",
        path: "content/pages",
        match: { include: "o-kempu" },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtitle", label: "Hero — Podnadpis" },
          { type: "string", name: "storyHeading", label: "Příběh — Nadpis" },
          { type: "string", name: "storyParagraph1", label: "Příběh — Odstavec 1", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph2", label: "Příběh — Odstavec 2", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph3", label: "Příběh — Odstavec 3", ui: { component: "textarea" } },
          { type: "string", name: "milestonesHeading", label: "Milníky — Nadpis" },
          { type: "string", name: "activitiesHeading", label: "Aktivity — Nadpis" },
          {
            type: "object",
            name: "activities",
            label: "Aktivity",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Název" },
              { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "teamHeading", label: "Tým — Nadpis" },
          {
            type: "object",
            name: "teamMembers",
            label: "Členové týmu",
            list: true,
            fields: [
              { type: "string", name: "name", label: "Jméno" },
              { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "trustItems", label: "Důvěra — položky", list: true },
        ],
        ui: {
          router: () => "/o-kempu",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "jakpomoci",
        label: "Jak pomoci",
        path: "content/pages",
        match: { include: "jak-pomoci" },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtitle", label: "Hero — Podnadpis" },
          { type: "string", name: "donationHeading", label: "Darování — Nadpis" },
          { type: "string", name: "donationIntro", label: "Darování — Úvod", ui: { component: "textarea" } },
          {
            type: "object",
            name: "donationTiers",
            label: "Darování — Úrovně",
            list: true,
            fields: [
              { type: "string", name: "amount", label: "Částka" },
              { type: "string", name: "desc", label: "Popis" },
              { type: "boolean", name: "featured", label: "Zvýraznit" },
            ],
          },
          { type: "string", name: "transparencyHeading", label: "Transparentnost — Nadpis" },
          { type: "string", name: "transparencyIntro", label: "Transparentnost — Úvod", ui: { component: "textarea" } },
          { type: "string", name: "accountNumber", label: "Číslo účtu" },
          { type: "string", name: "transactionLinkLabel", label: "Výpis transakcí — text odkazu" },
          { type: "string", name: "transactionLinkHref", label: "Výpis transakcí — URL" },
          { type: "string", name: "donationContractLabel", label: "Darovací smlouva — text tlačítka" },
          { type: "string", name: "sponsoringHeading", label: "Sponzoring — Nadpis" },
          { type: "string", name: "sponsoringIntro", label: "Sponzoring — Úvod", ui: { component: "textarea" } },
          { type: "string", name: "sponsoringBenefits", label: "Sponzoring — výhody", list: true },
          { type: "string", name: "volunteeringHeading", label: "Dobrovolnictví — Nadpis" },
          { type: "string", name: "volunteeringIntro", label: "Dobrovolnictví — Úvod", ui: { component: "textarea" } },
          { type: "string", name: "volunteeringRequirements", label: "Dobrovolnictví — požadavky", list: true },
        ],
        ui: {
          router: () => "/jak-pomoci",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "kontakt",
        label: "Kontakt",
        path: "content/pages",
        match: { include: "kontakt" },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtitle", label: "Hero — Podnadpis" },
          { type: "string", name: "contactHeading", label: "Kontakt — Nadpis sekce" },
          { type: "string", name: "organizerName", label: "Organizátorka — Jméno" },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "facebookLabel", label: "Facebook — text odkazu" },
          { type: "string", name: "facebookHref", label: "Facebook — URL" },
          { type: "string", name: "affiliationLabel", label: "Záštita — název" },
          { type: "string", name: "affiliationHref", label: "Záštita — URL" },
          { type: "string", name: "formHeading", label: "Formulář — Nadpis" },
          { type: "string", name: "formNameLabel", label: "Formulář — štítek Jméno" },
          { type: "string", name: "formEmailLabel", label: "Formulář — štítek Email" },
          { type: "string", name: "formMessageLabel", label: "Formulář — štítek Zpráva" },
          { type: "string", name: "formSubmitLabel", label: "Formulář — text tlačítka" },
        ],
        ui: {
          router: () => "/kontakt",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "global",
        label: "Globální — Footer & Statistiky",
        path: "content/pages",
        match: { include: "global" },
        fields: [
          {
            type: "object",
            name: "stats",
            label: "Statistiky",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Hodnota" },
              { type: "string", name: "label", label: "Popis" },
            ],
          },
          { type: "string", name: "footerTagline", label: "Footer — Popis kempu", ui: { component: "textarea" } },
          { type: "string", name: "footerContactName", label: "Footer — Kontakt jméno" },
          { type: "string", name: "footerEmail", label: "Footer — Email" },
          { type: "string", name: "footerFacebookLabel", label: "Footer — Facebook text" },
          { type: "string", name: "footerFacebookHref", label: "Footer — Facebook URL" },
        ],
        ui: {
          allowedActions: { create: false, delete: false },
        },
      },
    ],
  },
});
