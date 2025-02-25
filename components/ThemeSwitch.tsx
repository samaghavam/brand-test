"use client";

import { Switch } from "@heroui/react";
import { useThemeStore } from "@/store/useThemeStore";
import { HiMoon, HiSun } from "react-icons/hi";

export function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <Switch
      isSelected={isDarkMode}
      onValueChange={toggleTheme}
      color="secondary"
      size="lg"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <HiMoon className={className} />
        ) : (
          <HiSun className={className} />
        )
      }
    >
    </Switch>
  );
}
