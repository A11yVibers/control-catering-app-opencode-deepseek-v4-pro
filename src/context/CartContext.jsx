import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITEM_MAP, MIN_PORTIONS, MAX_PORTIONS } from "../data/menu.js";

const CART_KEY = "control-catering-cart";

const CartContext = createContext(null);

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // Best-effort persistence only.
    }
  }, [items]);

  const addItem = (itemId, quantity) => {
    const qty = clampQuantity(quantity);
    setItems((prev) => {
      const existing = prev.find((entry) => entry.itemId === itemId);
      if (existing) {
        return prev.map((entry) =>
          entry.itemId === itemId
            ? { ...entry, quantity: clampQuantity(existing.quantity + qty) }
            : entry
        );
      }
      return [...prev, { itemId, quantity: qty }];
    });
  };

  const setQuantity = (itemId, quantity) => {
    const qty = clampQuantity(quantity);
    setItems((prev) =>
      prev.map((entry) =>
        entry.itemId === itemId ? { ...entry, quantity: qty } : entry
      )
    );
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((entry) => entry.itemId !== itemId));
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => {
    const detailed = items
      .map((entry) => {
        const item = ITEM_MAP[entry.itemId];
        if (!item) return null;
        return { ...entry, item, lineTotal: item.price * entry.quantity };
      })
      .filter(Boolean);

    const subtotal = detailed.reduce((sum, entry) => sum + entry.lineTotal, 0);
    const totalItems = detailed.reduce((sum, entry) => sum + entry.quantity, 0);

    return {
      items,
      detailed,
      subtotal,
      totalItems,
      isEmpty: detailed.length === 0,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function clampQuantity(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return MIN_PORTIONS;
  return Math.min(MAX_PORTIONS, Math.max(MIN_PORTIONS, Math.round(n)));
}
