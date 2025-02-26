"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { ThemeSwitch } from "./theme/ThemeSwitch";
import { SearchInput } from "./SearchInput";
import Image from "next/image";



export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleSearch = (term: string) => {
    // Handle search logic here
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-neutral-white dark:bg-slate-500"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-slate-500 dark:text-neutral-white"
        />
        <NavbarBrand>
          <Image src="/logo.svg" alt="Logo" width={32} height={32} priority />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            href="/"
            className={`${
              pathname === "/"
                ? "text-indigo-500 dark:text-indigo-300 font-extrabold"
                : "text-slate-500 dark:text-neutral-light-2"
            }`}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/explore"
            className={`${
              pathname === "/explore"
                ? "text-indigo-500 dark:text-indigo-300 font-extrabold"
                : "text-slate-500 dark:text-neutral-light-2"
            }`}
          >
            Explore
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/integrations"
            className={`${
              pathname === "/integrations"
                ? "text-indigo-500 dark:text-indigo-300 font-extrabold"
                : "text-slate-500 dark:text-neutral-light-2"
            }`}
          >
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <SearchInput onSearch={handleSearch} />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="#"
            className="bg-indigo-500 text-neutral-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-neutral-white dark:bg-slate-500">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`w-full ${
                index === 2
                  ? "text-indigo-500 dark:text-indigo-300"
                  : index === menuItems.length - 1
                  ? "text-status-error dark:text-status-error-light"
                  : "text-slate-500 dark:text-neutral-light-2"
              }`}
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
