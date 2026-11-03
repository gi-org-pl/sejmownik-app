import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { i18n } from "@lingui/core";
import { I18nProvider, Trans, useLingui } from "@lingui/react";
import { render, screen } from "@testing-library/react";

import { withI18n } from "../.storybook/preview";

const packageJson = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../package.json"),
    "utf8",
  ),
) as { scripts: Record<string, string> };

const LocaleProbe = () => {
  const { i18n: lingui } = useLingui();
  return <span data-testid="i18n-locale">{lingui.locale}</span>;
};

describe("i18n setup", () => {
  describe("given the Sejmownik app is built", () => {
    it("compiles the catalogs before build", () => {
      expect(packageJson.scripts.prebuild).toBe("yarn i18n:compile");
      expect(packageJson.scripts.build).toContain("yarn prebuild");
      expect(packageJson.scripts["i18n:compile"]).toBe(
        "lingui compile --typescript",
      );
    });
  });

  describe("given a <Trans> string with no English translation", () => {
    it("renders the Polish source text", () => {
      i18n.load({
        pl: {},
        en: {},
      });
      i18n.activate("en");

      render(
        <I18nProvider i18n={i18n}>
          <Trans
            id="i18n-setup.fallback"
            message="Tekst źródłowy bez tłumaczenia"
          />
        </I18nProvider>,
      );

      expect(
        screen.getByText("Tekst źródłowy bez tłumaczenia"),
      ).toBeInTheDocument();
    });
  });

  describe("given a Storybook story", () => {
    it("renders inside the I18nProvider", () => {
      render(withI18n(LocaleProbe));

      expect(screen.getByTestId("i18n-locale")).toBeInTheDocument();
    });
  });
});
