import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: {
      name: string;
    };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-emerald-500"
    >
      <div className="relative h-56 bg-zinc-800">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-emerald-400">{product.category.name}</p>

        <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>

        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <strong className="text-lg">{formatPrice(product.price)}</strong>

          <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
            Estoque: {product.stock}
          </span>
        </div>
      </div>
    </Link>
  );
}
