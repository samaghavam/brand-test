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

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "fa", name: "فارسی" },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
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
