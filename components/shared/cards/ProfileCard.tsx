"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { HiBriefcase } from "react-icons/hi2";

export function ProfileCard() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-8 rounded-xl border border-neutral-light-3 dark:border-neutral-gray-2">
      <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 mb-6">
        <HiBriefcase className="w-8 h-8 text-indigo-500" />
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center">
        {t("profile.card.title")}
      </h2>

      <p className="text-neutral-gray-4 dark:text-neutral-light-1 text-center mb-6">
        {t("profile.card.description")}
      </p>

      <Button
        color="primary"
        size="lg"
        className="w-full mb-4"
        onClick={() => router.push("/step/1")}
      >
        {t("profile.card.startButton")}
      </Button>

      <Button
        variant="light"
        color="primary"
        as="a"
        href="#"
        className="text-sm"
      >
        {t("profile.card.learnMore")}
      </Button>
    </div>
  );
}
