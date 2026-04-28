"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart-storage";

export function ClearCartOnSuccess() {
  useEffect(() => {
    clearCart();
  }, []);

  return null;
}
