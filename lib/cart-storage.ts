import { CartItem, CartProduct } from "@/types/cart";

const CART_KEY = "shopflow-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem(CART_KEY);
    if (!cart) return [];
    return JSON.parse(cart);
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(product: CartProduct) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, item.stock),
          }
        : item
    );

    saveCart(updatedCart);
    return updatedCart;
  }

  const updatedCart = [
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ];

  saveCart(updatedCart);
  return updatedCart;
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCart().map((item) =>
    item.id === productId
      ? {
          ...item,
          quantity: Math.max(1, Math.min(quantity || 1, item.stock)),
        }
      : item
  );

  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}
