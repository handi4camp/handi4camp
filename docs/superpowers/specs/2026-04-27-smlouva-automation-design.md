# Darovací smlouva automation

**Date:** 2026-04-27  
**Status:** Approved

## Summary

Automate filling and emailing `public/smlouva.docx` (darovací smlouva) the same way `public/potvrzeni.docx` works. User fills a modal form on the Darování tab; the server renders the Word template via docxtemplater, emails the filled contract to the donor and the admin, and returns it as a download.

---

## 1. Template modification (`public/smlouva.docx`)

A one-off Python script patches the docx XML, replacing placeholder text with docxtemplater `{variable}` tags:

| Current text in doc | Replaced with |
|---|---|
| `NÁZEV` (split across 2 XML runs) | `{nazev}` |
| `ADRESA` | `{adresa}` |
| `IČ:` | `IČ: {ico}` |
| `DIČ:` | `DIČ: {dic}` |
| `……………..,- Kč` (amount dots) | `{castka_cislem},- Kč` |
| `slovy ………… korun` | `slovy {castka_slovy} korun` |
| ` 4. 2. 2026` (date in Ve Valticích dne…) | ` {datum}` |
| `jméno` below signature line (split across 3 runs) | `{nazev}` |

The modified docx replaces the original at `public/smlouva.docx`.

---

## 2. `app/api/smlouva/template-data.ts`

### Types

```ts
type SmlouvaPayload = {
  nazev: string;
  adresa: string;
  ico: string;
  dic?: string;
  castka: string;   // numeric string, e.g. "5000"
  datum: string;
  email: string;
};
```

### Functions

- `toSmlouvaPayload(value: unknown): SmlouvaPayload` — validates and sanitises raw request body
- `toTemplateVariables(payload: SmlouvaPayload)` — returns the object passed to `doc.render()`:
  - `nazev`, `adresa`, `ico`, `dic`, `datum` — passed through
  - `castka_cislem` — `payload.castka` formatted with Czech locale and thousands separator (e.g. `"5 000"`)
  - `castka_slovy` — result of `numberToCzechWords(Number(payload.castka))`
- `numberToCzechWords(n: number): string` — converts integer to Czech words without currency suffix, e.g. `5000 → "pět tisíc"`, `1234 → "jeden tisíc dvě stě třicet čtyři"`. Handles 0–9 999 999.

---

## 3. `app/api/smlouva/route.ts`

```
POST /api/smlouva
Content-Type: application/json
```

**Request body:** `SmlouvaPayload` fields

**Behaviour:**
1. Parse + validate body via `toSmlouvaPayload()`; return 400 if required fields missing
2. Load `public/smlouva.docx`, render via PizZip + Docxtemplater with `toTemplateVariables(payload)`
3. Send two emails in parallel via Resend:
   - **To donor** (`payload.email`): subject `"Vaše darovací smlouva – Handi4Camp"`, body with greeting, attachment `smlouva-darovaci.docx`
   - **To admin** (`handi4camp@proton.me`): subject `"Darovací smlouva – {nazev}"`, body with all field summary, same attachment
4. Fire PostHog event `donation_contract_generated` with `{ donation_amount: castka }`
5. Return the rendered docx buffer as `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**From address:** `Handi4Camp <potvrzeni@handi4camp.cz>` (same sender as potvrzení)

---

## 4. `DonationContractButton` (in `app/jak-pomoci/_client.tsx`)

A new component structured identically to `DonationConfirmationButton`. Added alongside it inside `DonationBox`'s `children` slot (rendered as a second button below the existing one).

### Form fields

| Label | Field name | Notes |
|---|---|---|
| Jméno a příjmení / Název firmy | `nazev` | required |
| Adresa / Sídlo | `adresa` | required |
| Rodné číslo / IČO | `ico` | required |
| DIČ (pokud je přiděleno) | `dic` | optional |
| Datum darování | `datum` | required, placeholder `např. 26.04.2026` |
| Výše daru | `castka` | required, numeric, suffix `Kč` |
| Váš e-mail | `email` | required, type=email |

Amount in words is auto-generated server-side — not exposed in the form.

### Behaviour
- On submit: `POST /api/smlouva`, download response blob as `smlouva-darovaci.docx`
- PostHog capture: `donation_contract_form_opened` on open, `donation_contract_downloaded` on success
- Error: `alert("Nepodařilo se vygenerovat smlouvu. Zkuste to prosím znovu.")`

---

## 5. Data flow

```
User fills modal form
  → POST /api/smlouva
    → parse & validate payload
    → numberToCzechWords(castka)
    → docxtemplater renders smlouva.docx
    → Resend: email to donor + admin (parallel)
    → PostHog event
    → return filled .docx
  → browser downloads smlouva-darovaci.docx
```

---

## Out of scope

- PDF conversion
- Storing contracts server-side
- Czech number-to-words for amounts with haléře (cents)
- DIČ validation
