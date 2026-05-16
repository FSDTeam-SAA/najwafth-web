"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

const HOME_SECTION_ROUTES = ["/", "/popular-books", "/featured-bookstores"];

function isLinkActive(linkHref: string, pathname: string): boolean {
  if (linkHref === "/") {
    return HOME_SECTION_ROUTES.includes(pathname);
  }
  return pathname === linkHref || pathname.startsWith(linkHref + "/");
}

type SearchItem = {
  id: string;
  title: string;
  author: string;
  location: string;
};

type CartResponse = {
  data?: {
    items?: unknown[];
  };
};

export function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const token = session?.user?.accessToken;
  const avatarUrl =
    session?.user?.avatar || "https://i.pravatar.cc/120?u=books-user";

  const { data: cartResponse } = useQuery<CartResponse>({
    queryKey: ["cart", token],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      return response.json();
    },
    enabled: !!token,
  });

  const cartItemsCount = cartResponse?.data?.items?.length || 0;

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/order", label: t("nav.order") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/about-us", label: t("nav.aboutUs") },
  ];

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(searchText.trim());
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedSearch.length < 2) {
      return;
    }

    const controller = new AbortController();

    async function runSearch() {
      try {
        setIsSearching(true);
        const query = new URLSearchParams({
          kind: "popular",
          page: "1",
          limit: "6",
          search: debouncedSearch,
        });

        const response = await fetch(`/api/home/books?${query.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const payload = (await response.json().catch(() => null)) as {
          items?: SearchItem[];
        } | null;

        if (!response.ok) {
          setSearchResults([]);
          return;
        }

        setSearchResults(Array.isArray(payload?.items) ? payload.items : []);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }

    runSearch();

    return () => controller.abort();
  }, [debouncedSearch]);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = searchText.trim();
    if (!value) return;
    setShowSearchDropdown(false);
    router.push(`/popular-books?search=${encodeURIComponent(value)}`);
  }

  function handlePickResult(value: string) {
    setSearchText(value);
    setShowSearchDropdown(false);
    router.push(`/popular-books?search=${encodeURIComponent(value)}`);
  }

  function handleOpenSearch() {
    setIsDesktopSearchOpen(true);
    setShowSearchDropdown(true);
  }

  function handleCloseSearch() {
    setIsDesktopSearchOpen(false);
    setShowSearchDropdown(false);
  }

  function handleOpenMobileSearch() {
    setIsMobileSearchOpen(true);
    setShowSearchDropdown(true);
  }

  function handleCloseMobileSearch() {
    setIsMobileSearchOpen(false);
    setShowSearchDropdown(false);
  }

  function handleSearchChange(value: string) {
    setSearchText(value);
    if (value.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
    }
  }

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

        <nav className="hidden items-center gap-9 text-[18px] font-normal text-[#111827] xl:flex">
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
          <div ref={searchContainerRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className={`hidden h-10 w-10 cursor-pointer rounded-full p-1 xl:inline-flex ${
                isDesktopSearchOpen ? "xl:hidden" : ""
              }`}
              onClick={handleOpenSearch}
            >
              <Search className="!h-6 !w-6 stroke-[2.3]" />
              <span className="sr-only">{t("nav.searchPlaceholder")}</span>
            </Button>

            {isDesktopSearchOpen ? (
              <div className="hidden xl:block">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex h-12 w-[520px] items-center overflow-hidden rounded-2xl border border-[#9fc5e9] bg-white"
                >
                  <input
                    type="text"
                    value={searchText}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    onFocus={() => setShowSearchDropdown(true)}
                    placeholder={t("nav.searchPlaceholder")}
                    className="h-full w-full border-0 bg-transparent px-5 text-[15px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="flex h-full w-14 shrink-0 cursor-pointer items-center justify-center bg-[#5B9BD5] text-white transition hover:bg-[#4E8CC5]"
                    aria-label="Search books"
                  >
                    <Search className="h-4 w-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    className="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center border-l border-[#d8e6f3] text-[#5B728C] transition hover:bg-[#f3f8fc]"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>

                {showSearchDropdown && searchText.trim().length > 0 ? (
                  <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[520px] overflow-hidden rounded-xl border border-[#dbe7f3] bg-white shadow-xl">
                    {isSearching ? (
                      <p className="px-4 py-3 text-sm text-[#6B7280]">{t("nav.searching")}</p>
                    ) : searchResults.length > 0 ? (
                      <ul className="max-h-72 overflow-y-auto">
                        {searchResults.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => handlePickResult(item.title)}
                              className="w-full cursor-pointer border-b border-[#eef3f8] px-4 py-3 text-left transition hover:bg-[#f7fbff]"
                            >
                              <p className="line-clamp-1 text-sm font-semibold text-[#111827]">
                                {item.title}
                              </p>
                              <p className="line-clamp-1 text-xs text-[#6B7280]">
                                {item.author} • {item.location}
                              </p>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-4 py-3 text-sm text-[#6B7280]">
                        {t("nav.noBooksFound", { query: searchText.trim() })}
                      </p>
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 cursor-pointer rounded-full p-1 xl:hidden"
            onClick={handleOpenMobileSearch}
          >
            <Search className="h-5 w-5 stroke-[2.3]" />
            <span className="sr-only">{t("nav.searchPlaceholder")}</span>
          </Button>
          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer rounded-full p-1"
            >
              <ShoppingCart className="!h-6 !w-6" />
              <span className="sr-only">Cart</span>
            </Button>
            {cartItemsCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#459AE4] px-1 text-[11px] font-bold leading-none text-white">
                {cartItemsCount}
              </span>
            ) : null}
          </Link>
          {isAuthenticated ? (
            <Link href="/account" className="ml-1 hidden xl:block">
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
            <Link href="/signin" className="hidden xl:block">
              <Button className="cursor-pointer rounded-xl px-5 py-5 text-[15px]">
                {t("nav.signIn")}
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full xl:hidden"
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

      {isMobileSearchOpen ? (
        <div className="border-t border-black/6 px-4 pb-3 pt-2 sm:px-6 xl:hidden">
          <div className="relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex h-11 w-full items-center overflow-hidden rounded-xl border border-[#9fc5e9] bg-white"
            >
              <input
                type="text"
                value={searchText}
                onChange={(event) => handleSearchChange(event.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder={t("nav.searchPlaceholder")}
                className="h-full w-full border-0 bg-transparent px-4 text-[14px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                autoFocus
              />
              <button
                type="submit"
                className="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center bg-[#5B9BD5] text-white"
                aria-label="Search books"
              >
                <Search className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleCloseMobileSearch}
                className="flex h-full w-10 shrink-0 cursor-pointer items-center justify-center border-l border-[#d8e6f3] text-[#5B728C]"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </form>

            {showSearchDropdown && searchText.trim().length > 0 ? (
              <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full overflow-hidden rounded-xl border border-[#dbe7f3] bg-white shadow-xl">
                {isSearching ? (
                  <p className="px-4 py-3 text-sm text-[#6B7280]">{t("nav.searching")}</p>
                ) : searchResults.length > 0 ? (
                  <ul className="max-h-72 overflow-y-auto">
                    {searchResults.map((item) => (
                      <li key={`mobile-${item.id}`}>
                        <button
                          type="button"
                          onClick={() => handlePickResult(item.title)}
                          className="w-full cursor-pointer border-b border-[#eef3f8] px-4 py-3 text-left transition hover:bg-[#f7fbff]"
                        >
                          <p className="line-clamp-1 text-sm font-semibold text-[#111827]">
                            {item.title}
                          </p>
                          <p className="line-clamp-1 text-xs text-[#6B7280]">
                            {item.author} • {item.location}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-sm text-[#6B7280]">
                    {t("nav.noBooksFound", { query: searchText.trim() })}
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <nav
        className={`overflow-hidden border-t border-black/6 transition-[max-height,opacity] duration-200 xl:hidden ${
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
              <Button className="cursor-pointer mt-2 w-full rounded-xl text-[14px]">
                {t("nav.signIn")}
              </Button>
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
