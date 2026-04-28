"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name"));
  const description = String(formData.get("description"));
  const imageUrl = String(formData.get("imageUrl"));
  const categoryId = String(formData.get("categoryId"));
  const priceInReais = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const isActive = formData.get("isActive") === "on";

  if (!name || !description || !imageUrl || !categoryId) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  if (Number.isNaN(priceInReais) || priceInReais <= 0) {
    throw new Error("Preço inválido.");
  }

  if (Number.isNaN(stock) || stock < 0) {
    throw new Error("Estoque inválido.");
  }

  const slug = createSlug(name);
  const priceInCents = Math.round(priceInReais * 100);

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      imageUrl,
      categoryId,
      price: priceInCents,
      stock,
      isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function updateProductStock(formData: FormData) {
  await requireAdmin();

  const productId = String(formData.get("productId"));
  const stock = Number(formData.get("stock"));

  if (!productId) {
    throw new Error("Produto não informado.");
  }

  if (Number.isNaN(stock) || stock < 0) {
    throw new Error("Estoque inválido.");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
}