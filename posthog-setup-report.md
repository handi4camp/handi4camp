<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Handi4Camp Next.js App Router project. PostHog is initialized client-side via `instrumentation-client.ts` (Next.js 15.3+ pattern), with a reverse proxy configured through `/ingest` rewrites in `next.config.ts` pointing to the EU PostHog cluster. A server-side PostHog client factory (`lib/posthog-server.ts`) is used for tracking critical server-side events in both API routes.

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicks the primary or secondary CTA button in the hero section | `components/hero.tsx` |
| `jak_pomoci_tab_selected` | User selects a tab (donation, sponsoring, or volunteering) on the Jak pomoci page | `app/jak-pomoci/page.tsx` |
| `contact_form_opened` | User opens the contact form (sponsor or volunteer inquiry) | `components/contact-form.tsx` |
| `contact_form_submitted` | Contact form successfully submitted | `components/contact-form.tsx` |
| `donation_confirmation_form_opened` | User opens the donation confirmation document request modal | `app/jak-pomoci/page.tsx` |
| `donation_confirmation_downloaded` | Donation confirmation document successfully downloaded | `app/jak-pomoci/page.tsx` |
| `contact_link_clicked` | User clicks a contact link on the Kontakt page (phone, email, Facebook, Instagram) | `app/kontakt/page.tsx` |
| `gallery_link_clicked` | User clicks the gallery link from the homepage photo strip | `app/page.tsx` |
| `contact_message_sent` | Server-side: email successfully dispatched via /api/kontakt | `app/api/kontakt/route.ts` |
| `donation_confirmation_generated` | Server-side: donation confirmation document generated and emailed via /api/potvrzeni | `app/api/potvrzeni/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/167097/dashboard/644802
- **Donation funnel** (hero CTA → tab → confirmation form → download): https://eu.posthog.com/project/167097/insights/X17W3Hvn
- **Contact form submissions by type** (sponzor vs dobrovolnik, weekly trend): https://eu.posthog.com/project/167097/insights/3mVzIrFK
- **Engagement tab breakdown** (pie chart: darovani / sponzoring / dobrovolnictvi): https://eu.posthog.com/project/167097/insights/2KQx4cIg
- **Contact link clicks by type** (phone / email / Facebook / Instagram): https://eu.posthog.com/project/167097/insights/Xbdw2A5d
- **Hero CTA performance** (primary vs secondary button, weekly trend): https://eu.posthog.com/project/167097/insights/LIEkomCE

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
