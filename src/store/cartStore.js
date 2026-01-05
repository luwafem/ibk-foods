import { create } from "zustand";

/**
 * Utility to safely parse JSON from localStorage
 */
const loadJSON = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const useCartStore = create((set, get) => ({
  /* ---------------- STATE ---------------- */

  cart: loadJSON("cart", []),

  customer: loadJSON("customer", {
    name: "",
    phone: ""
  }),

  delivery: {
    type: "pickup",
    address: ""
  },

  /* ---------------- ACTIONS ---------------- */

  addItem: (item) =>
    set((s) => {
      // 🔒 Force numeric values
      const safeItem = {
        ...item,
        quantity: Number(item.quantity) || 1,
        totalPrice: Number(item.totalPrice) || 0
      };

      const cart = [...s.cart, safeItem];
      localStorage.setItem("cart", JSON.stringify(cart));

      return { cart };
    }),

  removeItem: (index) =>
    set((s) => {
      const cart = s.cart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(cart));
      return { cart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },

  setCustomer: (data) =>
    set((s) => {
      const customer = { ...s.customer, ...data };
      localStorage.setItem("customer", JSON.stringify(customer));
      return { customer };
    }),

  setDelivery: (data) =>
    set((s) => ({
      delivery: { ...s.delivery, ...data }
    })),

  /* ---------------- DERIVED ---------------- */

  getTotal: () =>
    get().cart.reduce(
      (sum, item) => sum + Number(item.totalPrice || 0),
      0
    )
}));
