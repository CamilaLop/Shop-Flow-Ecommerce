"use client";

import { addToCart } from "@/lib/cart-storage";
import { CartProduct } from "@/types/cart";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: CartProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter();

  function handleAddToCart() {
    addToCart(product);
    router.push("/cart");
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock <= 0}
      className="w-full rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
    >
      {product.stock > 0 ? "Adicionar ao carrinho" : "Indisponível"}
    </button>
  );
}
