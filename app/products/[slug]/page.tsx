import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/format-price";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2">
        <div className="relative h-[500px] overflow-hidden rounded-2xl bg-zinc-900">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-400">
            {product.category.name}
          </p>

          <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-zinc-400">{product.description}</p>

          <p className="mt-8 text-3xl font-bold">
            {formatPrice(product.price)}
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            {product.stock > 0
              ? `${product.stock} unidades disponíveis`
              : "Produto indisponível"}
          </p>

          <div className="mt-8">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                stock: product.stock,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}