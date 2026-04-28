"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/auth";

export async function loginCustomer(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    redirect("/login?error=invalid");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    redirect("/login?error=invalid");
  }

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  redirect("/account");
}

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    redirect("/admin/login?error=invalid");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    redirect("/admin/login?error=invalid");
  }

  if (user.role !== "ADMIN") {
    redirect("/admin/login?error=not-admin");
  }

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/");
}