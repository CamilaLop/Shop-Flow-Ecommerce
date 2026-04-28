import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

interface CheckoutAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      items,
      address,
      customerEmail,
    }: {
      userId: string;
      items: CheckoutItem[];
      address: CheckoutAddress;
      customerEmail: string;
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não informado." },
        { status: 400 }
      );
    }

    if (!customerEmail) {
      return NextResponse.json(
        { error: "E-mail do cliente não informado." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
    }

    if (!address) {
      return NextResponse.json(
        { error: "Endereço não informado." },
        { status: 400 }
      );
    }

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        isActive: true,
      },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: "Um ou mais produtos não foram encontrados." },
        { status: 404 }
      );
    }

    let total = 0;

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        return NextResponse.json(
          { error: "Produto não encontrado." },
          { status: 404 }
        );
      }

      if (item.quantity <= 0) {
        return NextResponse.json(
          { error: `Quantidade inválida para ${product.name}.` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Estoque insuficiente para ${product.name}.` },
          { status: 400 }
        );
      }

      total += product.price * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        address: {
          create: {
            street: address.street,
            number: address.number,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country ?? "Brasil",
          },
        },
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;

            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price,
            };
          }),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;

        return {
          quantity: item.quantity,
          price_data: {
            currency: "brl",
            unit_amount: product.price,
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.imageUrl],
            },
          },
        };
      }),
      metadata: {
        orderId: order.id,
        userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel?orderId=${order.id}`,
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        stripeSessionId: session.id,
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar sessão de checkout." },
      { status: 500 }
    );
  }
}
