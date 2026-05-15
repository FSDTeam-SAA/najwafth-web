"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/order", label: "Order" },
  { href: "/contact", label: "Contact" },
  { href: "/about-us", label: "About Us" },
];

// Routes that belong to the Home section (so Home link stays active)
const HOME_SECTION_ROUTES = ["/", "/popular-books", "/featured-bookstores"];

function isLinkActive(linkHref: string, pathname: string): boolean {
  if (linkHref === "/") {
    return HOME_SECTION_ROUTES.includes(pathname);
  }
  return pathname === linkHref || pathname.startsWith(linkHref + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const avatarUrl =
    session?.user?.avatar || "https://i.pravatar.cc/120?u=books-user";

  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full container items-center justify-between gap-4 px-4 py-1.5 sm:px-6 lg:gap-6 lg:px-10">
        <Link
          href="/"
          className="relative flex h-18.75 w-29.75 shrink-0 items-center justify-center overflow-hidden"
        >
          <Image
            src="/images/logo.png"
            alt="Books and shack logo"
            fill
            sizes="119px"
            className="scale-[1.9] object-contain object-center"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 text-[18px] font-normal text-[#111827] lg:flex">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-[#459AE4]"
                    : "transition-colors hover:text-[#459AE4]"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 cursor-pointer rounded-full p-1"
          >
            <Search className="!h-6 !w-6 stroke-[2.4]" />
            <span className="sr-only">Search</span>
          </Button>
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer rounded-full p-1"
            >
              <ShoppingCart className="!h-6 !w-6 stroke-[2.4]" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          {/* <Button
            variant="ghost" 
            size="icon"
            className="h-10 w-10 cursor-pointer rounded-full p-1"
          >
            <Bell className="h-7 w-7 stroke-[2.4]" />
            <span className="sr-only">Notifications</span>
          </Button> */}
          {isAuthenticated ? (
            <Link href="/account" className="ml-1 hidden lg:block">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-[#d8e4ef]">
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link href="/signin" className="hidden lg:block">
              <Button className="rounded-xl px-5 py-5 text-[15px]">
                Sign in
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <nav
        className={`overflow-hidden border-t border-black/6 transition-[max-height,opacity] duration-200 lg:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto grid gap-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href, pathname);
            return (
              <Link
                key={`${link.href}-mobile`}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-[15px] transition-colors ${
                  active
                    ? "bg-[#459AE4]/8 text-[#459AE4]"
                    : "text-[#111827] hover:bg-[#459AE4]/5 hover:text-[#459AE4]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {!isAuthenticated ? (
            <Link href="/signin" className="sm:hidden">
              <Button className="mt-2 w-full rounded-xl text-[14px]">
                Sign in
              </Button>
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
