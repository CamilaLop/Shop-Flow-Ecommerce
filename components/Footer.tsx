export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-8 text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">ShopFlow</p>

          <p className="mt-1">
            Projeto em desenvolvimento, criado para fins de estudo, teste e
            portfólio.
          </p>

          <p className="mt-1 text-zinc-500">
            Project under development, created for learning, testing and
            portfolio purposes.
          </p>

          <p className="mt-3 font-medium text-zinc-300">
            Criado por Camila Lopes · Created by Camila Lopes
          </p>
        </div>

        <div className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-medium text-yellow-300">
          Ambiente de teste / Test environment
        </div>
      </div>
    </footer>
  );
}