import test from "node:test";
import assert from "node:assert/strict";

import { toTemplateVariables } from "./template-data.ts";

test("includes all potvrzeni template variables", () => {
  const templateVariables = toTemplateVariables({
    jmeno: "  Jan Novak  ",
    adresa: "  Ulice 1, Brno  ",
    rcico: "  12345678  ",
    dic: "  CZ12345678  ",
    email: "jan@example.com",
    datum: "  26.04.2026  ",
    dar: "  5000 Kč  ",
    ucel: "  Podpora Handi4Camp  ",
  });

  assert.deepEqual(templateVariables, {
    jmeno: "Jan Novak",
    adresa: "Ulice 1, Brno",
    rcico: "12345678",
    dic: "CZ12345678",
    datum: "26.04.2026",
    dar: "5000 Kč",
    ucel: "Podpora Handi4Camp",
  });
});

test("sets empty DIC when not provided", () => {
  const templateVariables = toTemplateVariables({
    jmeno: "Jan Novak",
    adresa: "Ulice 1, Brno",
    rcico: "12345678",
    email: "jan@example.com",
    datum: "26.04.2026",
    dar: "5000 Kč",
    ucel: "Podpora Handi4Camp",
  });

  assert.equal(templateVariables.dic, "");
});

test("adds Kč to dar by default when missing", () => {
  const templateVariables = toTemplateVariables({
    jmeno: "Jan Novak",
    adresa: "Ulice 1, Brno",
    rcico: "12345678",
    email: "jan@example.com",
    datum: "26.04.2026",
    dar: "5000",
    ucel: "Podpora Handi4Camp",
  });

  assert.equal(templateVariables.dar, "5000 Kč");
});
