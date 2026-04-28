"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart-storage";
import { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/format-price";

export function CheckoutPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const [address, setAddress] = useState({
    street: "",
    number: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Brasil",
  });

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-user-id",
          customerEmail,
          address,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error ?? "Erro ao iniciar checkout.");
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error(error);
      alert("Erro inesperado ao iniciar checkout.");
    } finally {
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <section className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Checkout</h1>
          <p className="mt-4 text-zinc-400">Seu carrinho está vazio.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleCheckout}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <h1 className="text-3xl font-bold">Finalizar compra</h1>

          <div className="mt-8 space-y-5">
            <Input
              label="E-mail"
              type="email"
              value={customerEmail}
              onChange={setCustomerEmail}
              placeholder="cliente@email.com"
            />

            <Input
              label="Rua"
              value={address.street}
              onChange={(value) =>
                setAddress((current) => ({ ...current, street: value }))
              }
              placeholder="Rua Exemplo"
            />

            <Input
              label="Número"
              value={address.number}
              onChange={(value) =>
                setAddress((current) => ({ ...current, number: value }))
              }
              placeholder="123"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Cidade"
                value={address.city}
                onChange={(value) =>
                  setAddress((current) => ({ ...current, city: value }))
                }
                placeholder="São Paulo"
              />

              <Input
                label="Estado"
                value={address.state}
                onChange={(value) =>
                  setAddress((current) => ({ ...current, state: value }))
                }
                placeholder="SP"
              />
            </div>

            <Input
              label="CEP"
              value={address.zipCode}
              onChange={(value) =>
                setAddress((current) => ({ ...current, zipCode: value }))
              }
              placeholder="00000-000"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full rounded-xl bg-emerald-500 px-5 py-4 font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {isLoading ? "Redirecionando..." : "Pagar com Stripe"}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Resumo do pedido</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-zinc-400">
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <span className="text-zinc-300">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-zinc-300">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
        placeholder={placeholder}
      />
    </div>
  );
}
