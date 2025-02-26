"use client";

import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { HiTranslate } from "react-icons/hi";
import { languageConfig } from "@/i18n/config";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "fa", name: "فارسی" },
  ];

  const handleLanguageChange = (lang: string) => {
    const config = languageConfig[lang as keyof typeof languageConfig];

    // Update document properties
    document.documentElement.dir = config.dir;
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty("--font-primary", config.font);

    // Change language after DOM updates
    i18n.changeLanguage(lang);

    // Force a re-render by updating body class
    document.body.className = document.body.className;
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          startContent={<HiTranslate className="text-xl" />}
        >
          {t("footer.language")}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {languages.map((lang) => (
          <DropdownItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={i18n.language === lang.code ? "text-indigo-500" : ""}
          >
            {lang.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
