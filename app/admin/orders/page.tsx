import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format-price";
import { requireAdmin } from "@/lib/auth";

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-emerald-400">Admin</p>
        <h1 className="mt-2 text-4xl font-bold">Pedidos</h1>

        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
          <table className="w-full border-collapse bg-zinc-900 text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                <th className="p-4">Pedido</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Itens</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-zinc-800">
                  <td className="p-4 font-medium">#{order.id.slice(0, 8)}</td>
                  <td className="p-4 text-zinc-400">{order.user.email}</td>
                  <td className="p-4 text-zinc-400">{order.items.length}</td>
                  <td className="p-4 text-zinc-400">
                    {formatPrice(order.total)}
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
