import { afterEach, describe, expect, it, vi } from "vitest";
import { IMPLANTACAO, precoComDesconto, selectedOffer } from "./ofertas";
afterEach(() => vi.useRealTimers());
describe("Contrato comercial publicado", () => {
  it("mantém os preços aprovados e o arredondamento da campanha", () => {
    expect(IMPLANTACAO.slice(0, 3).map((offer) => offer.valor)).toEqual([
      1497, 3297, 5497,
    ]);
    expect([1497, 3297, 5497].map(precoComDesconto)).toEqual([
      1048, 2308, 3848,
    ]);
  });
  it("preserva a promoção na proposta durante a validade", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-22T12:00:00-03:00"));
    const offer = selectedOffer("site-profissional", null, "black-friday");
    expect(offer?.campaign).toBe("black-friday");
    expect(offer?.price).toMatch(/2.308/);
  });
  it("encerra o desconto sem reiniciar o prazo", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-28T00:00:00-03:00"));
    const offer = selectedOffer("site-profissional", null, "black-friday");
    expect(offer?.campaign).toBeUndefined();
    expect(offer?.price).toMatch(/3.297/);
  });
  it("não transforma um identificador desconhecido em oferta", () => {
    expect(
      selectedOffer("plano-inexistente", null, "black-friday"),
    ).toBeUndefined();
  });
});
