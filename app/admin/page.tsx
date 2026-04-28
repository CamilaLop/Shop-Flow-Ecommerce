import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format-price";
import { requireAdmin } from "@/lib/auth";
import { logout } from "@/app/login/actions";

export default async function AdminPage() {
  const user = await requireAdmin();

  const [productsCount, orders, paidOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
    prisma.order.findMany({
      where: {
        status: "PAID",
      },
    }),
  ]);

  const revenue = paidOrders.reduce((acc, order) => acc + order.total, 0);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-emerald-400">Admin</p>

        <h1 className="mt-2 text-4xl font-bold">Painel administrativo</h1>

        <div className="mt-4 flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-zinc-400">Admin logado</p>
            <p className="font-semibold">
              {user.name} — {user.email}
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-red-400 hover:text-red-300"
            >
              Sair
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card title="Produtos" value={String(productsCount)} />
          <Card title="Pedidos recentes" value={String(orders.length)} />
          <Card title="Faturamento pago" value={formatPrice(revenue)} />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            href="/admin/products"
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-emerald-500"
          >
            <h2 className="text-xl font-semibold">Gerenciar produtos</h2>
            <p className="mt-2 text-zinc-400">
              Veja os produtos cadastrados e estoque disponível.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-emerald-500"
          >
            <h2 className="text-xl font-semibold">Gerenciar pedidos</h2>
            <p className="mt-2 text-zinc-400">
              Acompanhe pedidos criados, pagos e cancelados.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
