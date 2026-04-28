import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const customerPassword = await bcrypt.hash("cliente123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

 await prisma.user.upsert({
  where: {
    email: "cliente@shopflow.com",
    },
    update: {
      password: customerPassword,
      role: "CUSTOMER",
    },
    create: {
      name: "Cliente Demo",
      email: "cliente@shopflow.com",
      password: customerPassword,
      role: "CUSTOMER",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "admin@shopflow.com",
    },
    update: {
      password: adminPassword,
      role: "ADMIN",
    },
    create: {
      name: "Admin ShopFlow",
      email: "admin@shopflow.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const electronics = await prisma.category.upsert({
    where: { slug: "eletronicos" },
    update: {},
    create: {
      name: "Eletrônicos",
      slug: "eletronicos",
    },
  });

  const accessories = await prisma.category.upsert({
    where: { slug: "acessorios" },
    update: {},
    create: {
      name: "Acessórios",
      slug: "acessorios",
    },
  });

  const products = [
    {
      name: "Headset Gamer Pro",
      slug: "headset-gamer-pro",
      description:
        "Headset com áudio imersivo, microfone removível e acabamento premium.",
      price: 29990,
      imageUrl:
        "https://images.unsplash.com/photo-1599669454699-248893623440",
      stock: 15,
      categoryId: electronics.id,
    },
    {
      name: "Teclado Mecânico RGB",
      slug: "teclado-mecanico-rgb",
      description:
        "Teclado mecânico com switches responsivos, iluminação RGB e design compacto.",
      price: 42990,
      imageUrl:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
      stock: 10,
      categoryId: electronics.id,
    },
    {
      name: "Mouse Wireless",
      slug: "mouse-wireless",
      description:
        "Mouse sem fio ergonômico com alta precisão para trabalho e jogos.",
      price: 15990,
      imageUrl:
        "https://images.unsplash.com/photo-1527814050087-3793815479db",
      stock: 20,
      categoryId: electronics.id,
    },
    {
      name: "Smartwatch Fit",
      slug: "smartwatch-fit",
      description:
        "Relógio inteligente com monitoramento de atividades, notificações e bateria duradoura.",
      price: 34990,
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      stock: 12,
      categoryId: accessories.id,
    },
    {
      name: "Mochila Tech",
      slug: "mochila-tech",
      description:
        "Mochila resistente com compartimento para notebook e acabamento moderno.",
      price: 22990,
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      stock: 18,
      categoryId: accessories.id,
    },
    {
      name: "Câmera Compacta",
      slug: "camera-compacta",
      description:
        "Câmera compacta para fotos e vídeos com excelente qualidade de imagem.",
      price: 89990,
      imageUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      stock: 8,
      categoryId: electronics.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: product,
      create: product,
    });
  }

  console.log("Seed executado com sucesso.");
  console.log("Cliente: cliente@shopflow.com / cliente123");
  console.log("Admin: admin@shopflow.com / admin123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });