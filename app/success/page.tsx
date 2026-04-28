import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format-price";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <ClearCartOnSuccess />
        <section className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h1 className="text-3xl font-bold">Sessão não encontrada</h1>
          <p className="mt-4 text-zinc-400">
            Não foi possível localizar os dados do pagamento.
          </p>
        </section>
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const order = await prisma.order.findFirst({
    where: {
      stripeSessionId: sessionId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      address: true,
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <ClearCartOnSuccess />

      <section className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
          Pagamento recebido
        </div>

        <h1 className="mt-6 text-4xl font-bold">Obrigado pela sua compra!</h1>

        <p className="mt-4 text-zinc-400">
          Seu pedido foi criado com sucesso. A confirmação final será feita
          automaticamente pelo webhook da Stripe.
        </p>

        <div className="mt-8 rounded-xl bg-zinc-950 p-5">
          <p className="text-sm text-zinc-400">Status na Stripe</p>
          <p className="mt-1 font-semibold">{session.payment_status}</p>
        </div>

        {order && (
          <div className="mt-6 rounded-xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Pedido</p>
            <p className="mt-1 font-semibold">#{order.id}</p>

            <p className="mt-4 text-sm text-zinc-400">Status interno</p>
            <p className="mt-1 font-semibold">{order.status}</p>

            <p className="mt-4 text-sm text-zinc-400">Total</p>
            <p className="mt-1 font-semibold">{formatPrice(order.total)}</p>
          </div>
        )}

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950"
        >
          Voltar para a loja
        </Link>
      </section>
    </main>
  );
}
