import Link from "next/link";
import { loginCustomer } from "./actions";

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-sm font-medium text-emerald-400">
          Login do cliente / Customer login
        </p>

        <h1 className="mt-3 text-3xl font-bold">Entrar na minha conta</h1>

        <p className="mt-3 text-zinc-400">
          Acesse sua área para visualizar pedidos e finalizar compras com seus
          dados.
        </p>

        {error === "invalid" && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            E-mail ou senha inválidos.
          </div>
        )}

        <form action={loginCustomer} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-zinc-300">E-mail</label>
            <input
              type="email"
              name="email"
              required
              defaultValue="cliente@shopflow.com"
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Senha</label>
            <input
              type="password"
              name="password"
              required
              defaultValue="cliente123"
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            Entrar como cliente
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-zinc-400">
          <Link href="/" className="hover:text-white">
            Voltar para loja
          </Link>

          <Link href="/admin/login" className="hover:text-white">
            Login admin
          </Link>
        </div>
      </section>
    </main>
  );
}