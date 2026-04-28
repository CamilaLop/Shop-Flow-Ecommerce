import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format-price";
import { requireAdmin } from "@/lib/auth";
import { createProduct, updateProductStock } from "./actions";

export default async function AdminProductsPage() {
  await requireAdmin();

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-emerald-400">Admin</p>

        <h1 className="mt-2 text-4xl font-bold">Gerenciar produtos</h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Cadastre novos produtos, adicione foto, preço, categoria e quantidade
          em estoque.
        </p>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Adicionar novo produto</h2>

          <form action={createProduct} className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm text-zinc-300">Nome do produto</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ex: Fone Aurora"
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">Categoria</label>
              <select
                name="categoryId"
                required
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
              >
                <option value="">Selecione uma categoria</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-zinc-300">Valor em reais</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                placeholder="Ex: 199.90"
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">Quantidade</label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                placeholder="Ex: 20"
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-zinc-300">URL da foto</label>
              <input
                type="url"
                name="imageUrl"
                required
                placeholder="https://images.unsplash.com/..."
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
              />

              <p className="mt-2 text-xs text-zinc-500">
                Por enquanto, use um link de imagem. Pode ser Unsplash, Pexels
                ou uma imagem hospedada online.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-zinc-300">Descrição</label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Descreva o produto de forma clara e atrativa."
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked
                className="h-4 w-4 accent-emerald-500"
              />
              Produto ativo na loja
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
              >
                Adicionar produto
              </button>
            </div>
          </form>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Produtos cadastrados</h2>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full min-w-[900px] border-collapse bg-zinc-900 text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="p-4">Produto</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Estoque atual</th>
                  <th className="p-4">Atualizar estoque</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-zinc-800">
                    <td className="p-4 font-medium">{product.name}</td>

                    <td className="p-4 text-zinc-400">
                      {product.category.name}
                    </td>

                    <td className="p-4 text-zinc-400">
                      {formatPrice(product.price)}
                    </td>

                    <td className="p-4">
                      <span
                        className={
                          product.stock <= 3
                            ? "rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400"
                            : "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
                        }
                      >
                        {product.stock} unidades
                      </span>
                    </td>

                    <td className="p-4">
                      <form action={updateProductStock} className="flex gap-2">
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />

                        <input
                          type="number"
                          name="stock"
                          min={0}
                          defaultValue={product.stock}
                          className="w-24 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
                        />

                        <button
                          type="submit"
                          className="rounded-lg bg-emerald-500 px-3 py-2 font-semibold text-zinc-950 transition hover:bg-emerald-400"
                        >
                          Salvar
                        </button>
                      </form>
                    </td>

                    <td className="p-4">
                      {product.isActive ? (
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                          Ativo
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                          Inativo
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}