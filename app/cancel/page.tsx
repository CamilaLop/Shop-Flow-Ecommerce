import Link from "next/link";

interface CancelPageProps {
  searchParams: {
    orderId?: string;
  };
}

export default function CancelPage({ searchParams }: CancelPageProps) {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="inline-flex rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
          Pagamento cancelado
        </div>

        <h1 className="mt-6 text-4xl font-bold">Compra não finalizada</h1>

        <p className="mt-4 text-zinc-400">
          O pagamento foi cancelado. Você pode voltar ao carrinho e tentar
          novamente.
        </p>

        {searchParams.orderId && (
          <div className="mt-8 rounded-xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Pedido pendente</p>
            <p className="mt-1 font-semibold">#{searchParams.orderId}</p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link
            href="/cart"
            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950"
          >
            Voltar ao carrinho
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-white"
          >
            Ver produtos
          </Link>
        </div>
      </section>
    </main>
  );
}
