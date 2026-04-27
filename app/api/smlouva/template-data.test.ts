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
test("common donation 10000", () => assert.equal(numberToCzechWords(10000), "deset tisíc"));
test("mixed thousands", () => assert.equal(numberToCzechWords(1234), "jeden tisíc dvě stě třicet čtyři"));
test("2500", () => assert.equal(numberToCzechWords(2500), "dva tisíce pět set"));
test("one million", () => assert.equal(numberToCzechWords(1000000), "jeden milion"));
test("two million", () => assert.equal(numberToCzechWords(2000000), "dva miliony"));
test("five million", () => assert.equal(numberToCzechWords(5000000), "pět milionů"));

// toSmlouvaPayload
test("defaults to osoba when typ missing", () => {
  const p = toSmlouvaPayload({ nazev: "Jan", adresa: "Brno", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(p.typ, "osoba");
});

test("parses firma typ", () => {
  const p = toSmlouvaPayload({ typ: "firma", nazev: "ABC s.r.o.", adresa: "Praha", ico: "12345678", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(p.typ, "firma");
});

test("trims whitespace", () => {
  const p = toSmlouvaPayload({ typ: "osoba", nazev: "  Jan  ", adresa: " Brno ", rc: " 123456/7890 ", castka: " 5000 ", datum: " 1.1.2026 ", email: " a@b.com " });
  assert.equal(p.nazev, "Jan");
  assert.equal(p.rc, "123456/7890");
});

// toTemplateVariables — osoba
test("osoba: ico_udaj uses Rodné číslo label", () => {
  const vars = toTemplateVariables({ typ: "osoba", nazev: "Jan", adresa: "Brno", rc: "123456/7890", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.ico_udaj, "Rodné číslo: 123456/7890");
});

test("osoba: dic_udaj is empty", () => {
  const vars = toTemplateVariables({ typ: "osoba", nazev: "Jan", adresa: "Brno", rc: "123456/7890", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.dic_udaj, "");
});

// toTemplateVariables — firma
test("firma: ico_udaj uses IČO label", () => {
  const vars = toTemplateVariables({ typ: "firma", nazev: "ABC s.r.o.", adresa: "Praha", ico: "12345678", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.ico_udaj, "IČO: 12345678");
});

test("firma: dic_udaj includes DIČ when provided", () => {
  const vars = toTemplateVariables({ typ: "firma", nazev: "ABC s.r.o.", adresa: "Praha", ico: "12345678", dic: "CZ12345678", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.dic_udaj, "DIČ: CZ12345678");
});

test("firma: dic_udaj is empty when dic not provided", () => {
  const vars = toTemplateVariables({ typ: "firma", nazev: "ABC s.r.o.", adresa: "Praha", ico: "12345678", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.dic_udaj, "");
});

// castka formatting
test("formats castka with czech thousands separator", () => {
  const vars = toTemplateVariables({ typ: "osoba", nazev: "Jan", adresa: "Brno", rc: "123", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.castka_cislem, new Intl.NumberFormat("cs-CZ").format(5000));
});

test("generates castka_slovy", () => {
  const vars = toTemplateVariables({ typ: "osoba", nazev: "Jan", adresa: "Brno", rc: "123", castka: "5000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.castka_slovy, "pět tisíc");
});

test("castka with spaces stripped before parsing", () => {
  const vars = toTemplateVariables({ typ: "osoba", nazev: "Jan", adresa: "Brno", rc: "123", castka: "10 000", datum: "1.1.2026", email: "a@b.com" });
  assert.equal(vars.castka_slovy, "deset tisíc");
});
