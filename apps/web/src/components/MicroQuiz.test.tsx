import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { MicroQuiz } from "./MicroQuiz";
import Diagnostico from "../pages/Diagnostico";
afterEach(cleanup);
describe("Qualificação e implantação direta", () => {
  it("preserva as três escolhas, oferta e origem antes de abrir o WhatsApp", () => {
    render(
      <MemoryRouter
        initialEntries={["/solucoes/site-para-clinicas?utm_source=teste"]}
      >
        <MicroQuiz context="Clínicas" offer="Site profissional · R$ 3.297" />
      </MemoryRouter>,
    );
    expect(
      screen.queryByRole("link", { name: /continuar no whatsapp/i }),
    ).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: /clínica ou consultório/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /criar meu site/i }));
    fireEvent.click(screen.getByRole("button", { name: /^agora/i }));
    const url = new URL(
      screen
        .getByRole("link", { name: /continuar no whatsapp/i })
        .getAttribute("href")!,
    );
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain(
      "Site profissional · R$ 3.297",
    );
    expect(url.searchParams.get("text")).toContain("Clínica ou consultório");
    expect(url.searchParams.get("text")).toContain(
      "/solucoes/site-para-clinicas?utm_source=teste",
    );
    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));
    expect(
      screen.queryByRole("link", { name: /continuar no whatsapp/i }),
    ).toBeNull();
    expect(
      screen.getByRole("heading", { name: /quando quer começar/i }),
    ).toBeTruthy();
  });
  it("oculta perguntas de auditoria ao selecionar implantação", () => {
    render(
      <MemoryRouter initialEntries={["/diagnostico?plano=site-profissional"]}>
        <Diagnostico />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Site profissional · R\$ 3.297/)).toBeTruthy();
    expect(screen.queryByLabelText("Faturamento mensal aproximado")).toBeNull();
  });
});
