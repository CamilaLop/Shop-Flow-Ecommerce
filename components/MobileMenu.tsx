"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/login/actions";

type NavLink = {
  href: string;
  label: string;
};

export function MobileMenu({
  links,
  isLoggedIn,
}: {
  links: NavLink[];
  isLoggedIn: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 text-zinc-200"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
      >
        <div className="space-y-1.5">
          <span
            className={`block h-0.5 w-5 bg-current transition ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[73px] border-t border-zinc-800 bg-zinc-950 px-5 py-4 shadow-2xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-zinc-200 transition hover:bg-zinc-900"
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <form action={logout} className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-left font-medium text-zinc-200 transition hover:border-red-400 hover:text-red-300"
                >
                  Sair
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-2 rounded-xl bg-emerald-500 px-4 py-3 text-center font-semibold text-zinc-950 transition hover:bg-emerald-400"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}