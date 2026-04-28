import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth";
import { formatPrice } from "@/lib/format-price";
import { logout } from "@/app/login/actions";

export default async function AccountPage() {
  const user = await requireCustomer();

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Minha conta / My account
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Olá, {user.name}
            </h1>

            <p className="mt-3 text-zinc-400">{user.email}</p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-200 transition hover:border-red-400 hover:text-red-300"
            >
              Sair / Logout
            </button>
          </form>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Meus pedidos / My orders</h2>

          {orders.length === 0 ? (
            <div className="mt-6 rounded-xl bg-zinc-950 p-6">
              <p className="text-zinc-400">
                Você ainda não possui pedidos.
              </p>

              <Link
                href="/"
                className="mt-5 inline-block rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <p className="font-semibold">
                        Pedido #{order.id.slice(0, 8)}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        Status: {order.status}
                      </p>
                    </div>

                    <p className="font-bold">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-zinc-800 pt-4">
                    {order.items.map((item) => (
                      <p key={item.id} className="text-sm text-zinc-400">
                        {item.quantity}x {item.product.name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}