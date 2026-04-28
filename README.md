# ShopFlow — E-commerce Full Stack

Projeto de e-commerce completo para portfólio, com vitrine de produtos, carrinho, checkout, integração com Stripe, Prisma, PostgreSQL e painel administrativo simples.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Stripe Checkout
- Webhooks

## Funcionalidades

- Página inicial com produtos
- Página individual do produto
- Carrinho persistente no localStorage
- Checkout com dados de entrega
- Criação de pedido no banco
- Pagamento com Stripe Checkout
- Webhook para confirmação de pagamento
- Baixa de estoque após pagamento
- Página de sucesso
- Página de cancelamento
- Painel administrativo simples
- Seed com produtos de exemplo

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Configure o banco no `.env`.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/shopflow"
```

4. Rode a migration:

```bash
npx prisma migrate dev --name init
```

5. Popule o banco:

```bash
npm run seed
```

6. Inicie o projeto:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Stripe

Configure no `.env`:

```env
STRIPE_SECRET_KEY="sk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Para testar webhooks localmente:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Cartão de teste:

```txt
4242 4242 4242 4242
```

Use validade futura, CVC qualquer e CEP qualquer.

## Observação

Este projeto usa um usuário demo fixo para facilitar o MVP:

```txt
demo-user-id
```

Depois você pode substituir por autenticação real com Auth.js/NextAuth.
