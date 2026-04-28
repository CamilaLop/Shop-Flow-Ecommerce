import Link from "next/link";

const features = [
  {
    pt: "Catálogo de produtos com página individual",
    en: "Product catalog with individual product pages",
  },
  {
    pt: "Carrinho de compras persistente no navegador",
    en: "Persistent shopping cart in the browser",
  },
  {
    pt: "Controle de quantidade e remoção de itens",
    en: "Quantity control and item removal",
  },
  {
    pt: "Checkout com dados do cliente e endereço",
    en: "Checkout with customer and address information",
  },
  {
    pt: "Criação de pedidos no banco de dados",
    en: "Order creation in the database",
  },
  {
    pt: "Integração com Stripe Checkout",
    en: "Stripe Checkout integration",
  },
  {
    pt: "Webhook para confirmação automática de pagamento",
    en: "Webhook for automatic payment confirmation",
  },
  {
    pt: "Atualização de status do pedido após pagamento",
    en: "Order status update after payment",
  },
  {
    pt: "Baixa automática de estoque",
    en: "Automatic stock update",
  },
  {
    pt: "Painel administrativo com produtos, pedidos e métricas",
    en: "Admin dashboard with products, orders and metrics",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Prisma ORM",
  "PostgreSQL",
  "Supabase",
  "Stripe",
  "Server Components",
  "API Routes",
  "Webhooks",
];

const highlights = [
  {
    titlePt: "Integração com pagamento real",
    titleEn: "Real payment integration",
    descriptionPt:
      "O checkout foi integrado com Stripe, permitindo simular um fluxo real de compra com cartão de teste.",
    descriptionEn:
      "The checkout was integrated with Stripe, allowing a real purchase flow to be simulated with a test card.",
  },
  {
    titlePt: "Webhook seguro",
    titleEn: "Secure webhook",
    descriptionPt:
      "Após o pagamento, a Stripe envia um evento para a aplicação, que valida a assinatura e atualiza o pedido automaticamente.",
    descriptionEn:
      "After payment, Stripe sends an event to the application, which validates the signature and updates the order automatically.",
  },
  {
    titlePt: "Controle de estoque",
    titleEn: "Stock control",
    descriptionPt:
      "Quando o pagamento é confirmado, o sistema reduz o estoque dos produtos comprados.",
    descriptionEn:
      "When the payment is confirmed, the system decreases the stock of the purchased products.",
  },
  {
    titlePt: "Banco relacional",
    titleEn: "Relational database",
    descriptionPt:
      "A modelagem usa entidades como usuário, produto, categoria, pedido, item do pedido e endereço.",
    descriptionEn:
      "The data model uses entities such as user, product, category, order, order item and address.",
  },
];

const steps = [
  {
    number: "01",
    titlePt: "Produto",
    titleEn: "Product",
    descriptionPt:
      "O cliente acessa a vitrine e escolhe um produto cadastrado no banco.",
    descriptionEn:
      "The customer browses the storefront and chooses a product stored in the database.",
  },
  {
    number: "02",
    titlePt: "Carrinho",
    titleEn: "Cart",
    descriptionPt:
      "O item é salvo no carrinho com quantidade, preço e imagem.",
    descriptionEn:
      "The item is saved in the cart with quantity, price and image.",
  },
  {
    number: "03",
    titlePt: "Checkout",
    titleEn: "Checkout",
    descriptionPt:
      "O sistema cria um pedido pendente e redireciona para a Stripe.",
    descriptionEn:
      "The system creates a pending order and redirects the customer to Stripe.",
  },
  {
    number: "04",
    titlePt: "Webhook",
    titleEn: "Webhook",
    descriptionPt:
      "Após o pagamento, o webhook confirma o pedido e atualiza o estoque.",
    descriptionEn:
      "After payment, the webhook confirms the order and updates the stock.",
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 md:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
            Estudo de caso / Case study
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            ShopFlow — E-commerce Full Stack with integrated payment
          </h1>

          <p className="mt-6 text-base leading-8 text-zinc-400 md:text-lg">
            <strong className="text-zinc-200">PT:</strong> Projeto desenvolvido
            para demonstrar domínio em desenvolvimento full stack, integração
            com APIs externas, modelagem de banco de dados, checkout, carrinho
            de compras e confirmação de pagamento via webhook.
          </p>

          <p className="mt-4 text-base leading-8 text-zinc-400 md:text-lg">
            <strong className="text-zinc-200">EN:</strong> Project developed to
            demonstrate full stack development skills, external API integration,
            database modeling, checkout flow, shopping cart logic and payment
            confirmation through webhooks.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
            >
              Ver loja / View store
            </Link>

            <Link
              href="/admin"
              className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-white transition hover:border-emerald-500"
            >
              Ver admin / View admin
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Tipo de projeto / Project type"
            value="E-commerce Full Stack"
          />
          <InfoCard
            title="Foco técnico / Technical focus"
            value="Checkout, database and webhooks"
          />
          <InfoCard
            title="Status"
            value="Functional portfolio project"
          />
        </div>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
              Objetivo / Goal
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Criar uma experiência completa de compra online
            </h2>

            <h3 className="mt-2 text-lg font-semibold text-zinc-300">
              Build a complete online shopping experience
            </h3>

            <p className="mt-5 leading-8 text-zinc-400">
              <strong className="text-zinc-200">PT:</strong> O objetivo do
              projeto foi desenvolver uma aplicação que simulasse um e-commerce
              real, cobrindo desde a vitrine de produtos até a confirmação de
              pagamento. A aplicação permite que o usuário visualize produtos,
              adicione itens ao carrinho, preencha dados de entrega, finalize a
              compra e tenha o pedido confirmado automaticamente após o
              pagamento.
            </p>

            <p className="mt-5 leading-8 text-zinc-400">
              <strong className="text-zinc-200">EN:</strong> The goal was to
              build an application that simulates a real e-commerce experience,
              covering everything from the product storefront to payment
              confirmation. Users can browse products, add items to the cart,
              fill in delivery information, complete the purchase and have the
              order automatically confirmed after payment.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
            <h3 className="text-xl font-semibold">
              Funcionalidades / Features
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.pt}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300"
                >
                  <p>{feature.pt}</p>
                  <p className="mt-2 text-zinc-500">{feature.en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
            Tecnologias / Technologies
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Stack utilizada / Tech stack
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
            Arquitetura / Architecture
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Como o projeto funciona / How the project works
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                titlePt={step.titlePt}
                titleEn={step.titleEn}
                descriptionPt={step.descriptionPt}
                descriptionEn={step.descriptionEn}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
            Destaques técnicos / Technical highlights
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            O que este projeto demonstra / What this project demonstrates
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.titlePt}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
              >
                <h3 className="text-xl font-semibold">{item.titlePt}</h3>
                <p className="mt-1 text-sm font-medium text-emerald-400">
                  {item.titleEn}
                </p>

                <p className="mt-4 leading-7 text-zinc-400">
                  {item.descriptionPt}
                </p>

                <p className="mt-3 leading-7 text-zinc-500">
                  {item.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
            Fluxo de pagamento / Payment flow
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Da criação do pedido à confirmação automática
          </h2>

          <p className="mt-2 text-zinc-400">
            From order creation to automatic payment confirmation
          </p>

          <div className="mt-6 overflow-x-auto">
            <pre className="min-w-[620px] rounded-xl bg-zinc-950 p-5 text-sm leading-7 text-zinc-300">
{`PT:
Cliente adiciona produtos ao carrinho
↓
Cliente preenche dados no checkout
↓
Sistema cria pedido com status PENDING
↓
Sistema cria uma sessão de pagamento na Stripe
↓
Cliente realiza o pagamento
↓
Stripe envia evento para o webhook
↓
Sistema valida o evento recebido
↓
Pedido é atualizado para PAID
↓
Estoque dos produtos é reduzido

EN:
Customer adds products to the cart
↓
Customer fills in checkout information
↓
System creates an order with PENDING status
↓
System creates a Stripe checkout session
↓
Customer completes the payment
↓
Stripe sends an event to the webhook
↓
System validates the received event
↓
Order is updated to PAID
↓
Product stock is reduced`}
            </pre>
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
              Aprendizados / Learnings
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Principais desafios resolvidos
            </h2>

            <h3 className="mt-2 text-lg font-semibold text-zinc-300">
              Main challenges solved
            </h3>

            <ul className="mt-6 space-y-4 text-zinc-400">
              <li>• Modelagem de dados para pedidos e produtos.</li>
              <li>• Data modeling for products and orders.</li>
              <li>• Integração segura com API externa de pagamento.</li>
              <li>• Secure integration with an external payment API.</li>
              <li>• Validação de estoque antes da compra.</li>
              <li>• Stock validation before purchase.</li>
              <li>• Sincronização entre pagamento e banco de dados.</li>
              <li>• Synchronization between payment and database.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
              Sobre o projeto / About the project
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Projeto desenvolvido por Camila Lopes
            </h2>

            <h3 className="mt-2 text-lg font-semibold text-zinc-300">
              Project developed by Camila Lopes
            </h3>

            <p className="mt-6 leading-8 text-zinc-400">
              <strong className="text-zinc-200">PT:</strong> Este projeto foi
              criado como parte do meu portfólio de desenvolvimento web, com
              foco em demonstrar capacidade de criar aplicações completas,
              integrar serviços externos e estruturar soluções próximas de um
              cenário real de mercado.
            </p>

            <p className="mt-5 leading-8 text-zinc-400">
              <strong className="text-zinc-200">EN:</strong> This project was
              created as part of my web development portfolio, focused on
              demonstrating the ability to build complete applications,
              integrate external services and structure solutions close to a
              real market scenario.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

function StepCard({
  number,
  titlePt,
  titleEn,
  descriptionPt,
  descriptionEn,
}: {
  number: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-bold text-emerald-400">{number}</p>
      <h3 className="mt-4 text-xl font-semibold">{titlePt}</h3>
      <p className="mt-1 text-sm font-medium text-emerald-400">{titleEn}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{descriptionPt}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-500">{descriptionEn}</p>
    </div>
  );
}