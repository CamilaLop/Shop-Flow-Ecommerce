import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { logout } from "@/app/login/actions";
import { MobileMenu } from "@/components/MobileMenu";

export async function Navbar() {
  const user = await getSessionUser();

  const isAdmin = user?.role === "ADMIN";
  const isCustomer = user?.role === "CUSTOMER";

  const links = getLinks({ isAdmin, isCustomer });

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold">
          <span className="text-emerald-400">Shop</span>Flow
        </Link>

        <div className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}

          {user ? (
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-zinc-700 px-4 py-2 font-medium text-zinc-200 transition hover:border-red-400 hover:text-red-300"
              >
                Sair
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-emerald-500 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-emerald-400"
            >
              Entrar
            </Link>
          )}
        </div>

        <MobileMenu links={links} isLoggedIn={Boolean(user)} />
      </nav>
    </header>
  );
}

function getLinks({
  isAdmin,
  isCustomer,
}: {
  isAdmin: boolean;
  isCustomer: boolean;
}) {
  if (isAdmin) {
    return [
      {
        href: "/",
        label: "Loja",
      },
      {
        href: "/portfolio",
        label: "Projeto",
      },
      {
        href: "/admin",
        label: "Admin",
      },
      {
        href: "/admin/products",
        label: "Produtos",
      },
      {
        href: "/admin/orders",
        label: "Pedidos",
      },
    ];
  }

  if (isCustomer) {
    return [
      {
        href: "/",
        label: "Loja",
      },
      {
        href: "/portfolio",
        label: "Projeto",
      },
      {
        href: "/cart",
        label: "Carrinho",
      },
      {
        href: "/account",
        label: "Minha conta",
      },
    ];
  }

  return [
    {
      href: "/",
      label: "Loja",
    },
    {
      href: "/portfolio",
      label: "Projeto",
    },
    {
      href: "/cart",
      label: "Carrinho",
    },
  ];
}