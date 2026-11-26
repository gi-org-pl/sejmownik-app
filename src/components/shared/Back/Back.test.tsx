import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Back } from "./Back";
import type { BackProps } from "./Back.types";

const LABEL = "Posłowie · okręg nr 19";
const HREF = "/poslowie";

const renderBack = (props: Partial<BackProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <MemoryRouter>
        <Back label={LABEL} href={HREF} {...props} />
      </MemoryRouter>
    </I18nProvider>,
  );

describe("<Back />", () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
  });

  describe("given a label and href", () => {
    it("renders one link with the label as its name", () => {
      renderBack();

      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(screen.getByRole("link", { name: LABEL })).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    });

    it("points the link to href", () => {
      renderBack();

      expect(screen.getByRole("link", { name: LABEL })).toHaveAttribute(
        "href",
        HREF,
      );
    });

    it("shows a visible keyboard focus outline", () => {
      renderBack();

      expect(screen.getByRole("link", { name: LABEL })).toHaveClass(
        "focus-visible:outline-2",
      );
    });
  });

  describe("given a long label", () => {
    it("keeps the full label in the DOM", () => {
      const longLabel = "Posłowie · okręg nr 19 · ".repeat(8).trim();
      renderBack({ label: longLabel });

      expect(screen.getByRole("link", { name: longLabel })).toHaveTextContent(
        longLabel,
      );
    });
  });

  describe("given an empty label", () => {
    it("renders the link with the fallback label and warns in development", () => {
      renderBack({ label: "" });

      expect(screen.getByRole("link", { name: "Wróć" })).toHaveAttribute(
        "href",
        HREF,
      );
      expect(warn).toHaveBeenCalledTimes(1);
    });

    it("treats a whitespace-only label as empty", () => {
      renderBack({ label: "   " });

      expect(screen.getByRole("link", { name: "Wróć" })).toBeInTheDocument();
    });
  });

  describe("given no href", () => {
    it("renders nothing and warns in development", () => {
      const { container } = renderBack({ href: "" });

      expect(container).toBeEmptyDOMElement();
      expect(warn).toHaveBeenCalledTimes(1);
    });
  });

  describe("outside development", () => {
    it("does not warn", () => {
      vi.stubEnv("DEV", false);
      renderBack({ label: "" });
      renderBack({ href: "" });

      expect(warn).not.toHaveBeenCalled();
      vi.unstubAllEnvs();
    });
  });

  describe("the arrow", () => {
    it("is hidden from assistive technology", () => {
      renderBack();

      const link = screen.getByRole("link", { name: LABEL });
      expect(link.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });
  });
});
