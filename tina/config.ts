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
          {
            type: "string",
            name: "title",
            label: "Nadpis",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Datum publikace",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Titulní fotka",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Krátký popis",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Obsah",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/galerie/${document._sys.filename}`,
        },
      },
      {
        name: "gallery",
        label: "Galerie",
        path: "content/gallery",
        fields: [
          {
            type: "number",
            name: "year",
            label: "Rok ročníku",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Popis ročníku",
          },
          {
            type: "image",
            name: "photos",
            label: "Fotky",
            list: true,
          },
        ],
      },
      {
        name: "sponsor",
        label: "Sponzoři",
        path: "content/sponsors",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Název",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
          },
          {
            type: "string",
            name: "website",
            label: "Web URL",
          },
          {
            type: "string",
            name: "tier",
            label: "Úroveň partnerství",
            options: ["gold", "silver", "partner"],
          },
          {
            type: "boolean",
            name: "active",
            label: "Zobrazit na webu",
          },
        ],
      },
      {
        name: "milestone",
        label: "Milníky",
        path: "content/milestones",
        fields: [
          {
            type: "number",
            name: "year",
            label: "Rok",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Název milníku",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Popis",
            ui: { component: "textarea" },
          },
        ],
      },
    ],
  },
});
