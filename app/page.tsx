import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-emerald-400">
            ShopFlow E-commerce
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Loja online completa com carrinho e pagamento integrado.
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Projeto full stack desenvolvido com Next.js, Prisma, PostgreSQL e Stripe.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
