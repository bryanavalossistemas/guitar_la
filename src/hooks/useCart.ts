import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { GuitarType, ItemCartType } from "../types";

export function useCart() {
  const [data, setData] = useState<GuitarType[]>([]);
  const [cart, setCart] = useState<ItemCartType[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );

  useEffect(() => {
    setData(db);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(guitar: GuitarType) {
    const index = cart.findIndex((itemCart) => itemCart.id === guitar.id);
    if (index === -1) {
      const { description, ...rest } = guitar;
      setCart((prevCart) => [...prevCart, { ...rest, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[index].quantity++;
      setCart(updatedCart);
    }
  }

  function removeFromCart(id: GuitarType["id"]) {
    const updatedCart = cart.filter((itemCart) => itemCart.id !== id);
    setCart(updatedCart);
  }

  function increaseQuantity(id: GuitarType["id"]) {
    const updatedCart = cart.map((itemCart) => {
      if (itemCart.id === id) {
        return {
          ...itemCart,
          quantity: itemCart.quantity + 1,
        };
      }
      return itemCart;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function decreaseQuantity(id: GuitarType["id"]) {
    const updatedCart = cart.map((itemCart) => {
      if (itemCart.id === id && itemCart.quantity !== 1) {
        return {
          ...itemCart,
          quantity: itemCart.quantity - 1,
        };
      }
      return itemCart;
    });
    setCart(updatedCart);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, itemCart) => total + itemCart.price * itemCart.quantity,
        0
      ),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
}
