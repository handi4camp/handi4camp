import test from "node:test";
import assert from "node:assert/strict";

import { numberToCzechWords, toSmlouvaPayload, toTemplateVariables } from "./template-data.ts";

// numberToCzechWords
test("zero", () => assert.equal(numberToCzechWords(0), "nula"));
test("single digit", () => assert.equal(numberToCzechWords(5), "pět"));
test("teens", () => assert.equal(numberToCzechWords(15), "patnáct"));
test("tens", () => assert.equal(numberToCzechWords(20), "dvacet"));
test("tens + ones", () => assert.equal(numberToCzechWords(42), "čtyřicet dva"));
test("hundreds", () => assert.equal(numberToCzechWords(200), "dvě stě"));
test("hundreds + tens + ones", () => assert.equal(numberToCzechWords(356), "tři sta padesát šest"));
test("one thousand", () => assert.equal(numberToCzechWords(1000), "jeden tisíc"));
test("two thousand", () => assert.equal(numberToCzechWords(2000), "dva tisíce"));
test("five thousand", () => assert.equal(numberToCzechWords(5000), "pět tisíc"));
test("common donation 5000", () => assert.equal(numberToCzechWords(5000), "pět tisíc"));
test("common donation 10000", () => assert.equal(numberToCzechWords(10000), "deset tisíc"));
test("mixed thousands", () => assert.equal(numberToCzechWords(1234), "jeden tisíc dvě stě třicet čtyři"));
test("2500", () => assert.equal(numberToCzechWords(2500), "dva tisíce pět set"));
test("one million", () => assert.equal(numberToCzechWords(1000000), "jeden milion"));
test("two million", () => assert.equal(numberToCzechWords(2000000), "dva miliony"));
test("five million", () => assert.equal(numberToCzechWords(5000000), "pět milionů"));

// toSmlouvaPayload
test("trims whitespace", () => {
  const p = toSmlouvaPayload({ nazev: "  Jan  ", adresa: " Brno ", ico: " 123 ", castka: " 5000 ", datum: " 1.1.2026 ", email: " a@b.com " });
  assert.equal(p.nazev, "Jan");
  assert.equal(p.adresa, "Brno");
  assert.equal(p.ico, "123");
  assert.equal(p.castka, "5000");
  assert.equal(p.datum, "1.1.2026");
  assert.equal(p.email, "a@b.com");
});

test("handles missing dic", () => {
  const p = toSmlouvaPayload({ nazev: "Jan", adresa: "Brno", ico: "123", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(p.dic, "");
});

// toTemplateVariables
test("formats castka with czech thousands separator", () => {
  const vars = toTemplateVariables({ nazev: "Jan", adresa: "Brno", ico: "123", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.castka_cislem, "5 000");
});

test("generates castka_slovy", () => {
  const vars = toTemplateVariables({ nazev: "Jan", adresa: "Brno", ico: "123", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.castka_slovy, "pět tisíc");
});

test("empty dic becomes empty string", () => {
  const vars = toTemplateVariables({ nazev: "Jan", adresa: "Brno", ico: "123", castka: "1000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.dic, "");
});

test("castka with spaces stripped before parsing", () => {
  const vars = toTemplateVariables({ nazev: "Jan", adresa: "Brno", ico: "123", castka: "10 000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.castka_slovy, "deset tisíc");
});
