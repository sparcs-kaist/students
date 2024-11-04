import React from "react";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { setUserLocale } from "@sparcs-students/web/i18n/locale";
import { locales } from "@sparcs-students/web/i18n/config";

const LanguageSwitcher = () => (
  <div style={{ display: "flex", gap: "12px" }}>
    {locales.map(locale => (
      <Button key={locale} onClick={() => setUserLocale(locale)}>
        {locale.toUpperCase()}
      </Button>
    ))}
  </div>
);

export default LanguageSwitcher;
