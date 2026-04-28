"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cart-storage";
import { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/format-price";
import Link from "next/link";

export function CartPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  function handleRemove(productId: string) {
    const updatedCart = removeFromCart(productId);
    setItems(updatedCart);
  }

  function handleQuantity(productId: string, quantity: number) {
    const updatedCart = updateQuantity(productId, quantity);
    setItems(updatedCart);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-bold">Carrinho</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-zinc-400">Seu carrinho está vazio.</p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-zinc-800">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-zinc-400">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <input
                        type="number"
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        onChange={(event) =>
                          handleQuantity(item.id, Number(event.target.value))
                        }
                        className="w-20 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                      />

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-xl font-semibold">Resumo</h2>

              <div className="mt-6 flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="mt-3 flex justify-between text-zinc-400">
                <span>Frete</span>
                <span>Grátis</span>
              </div>

              <div className="mt-6 border-t border-zinc-800 pt-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block rounded-xl bg-emerald-500 px-5 py-3 text-center font-semibold text-zinc-950 transition hover:bg-emerald-400"
              >
                Finalizar compra
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
