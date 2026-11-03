import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Outlet, Scripts } from "react-router";

import { DEFAULT_LANGUAGE } from "./constants/common";
import { messages as enMessages } from "./locales/en/messages";
import { messages as plMessages } from "./locales/pl/messages";

import "./index.css";

i18n.load({ en: enMessages, pl: plMessages });
i18n.activate(DEFAULT_LANGUAGE);

export default function App() {
  return (
    <html lang={DEFAULT_LANGUAGE}>
      <head>
        <title>vite-boilerplate</title>
      </head>
      <body>
        <I18nProvider i18n={i18n}>
          <Outlet />
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  );
}
