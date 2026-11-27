import { useSyncExternalStore, type SetStateAction } from "react";

export type CartLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string;
  date: string;
  branch: string;
  receiver: string;
  phone: string;
  note: string;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  total: number;
  status: "Chờ xác nhận" | "Hủy";
};

// Shared for the lifetime of the app so navigation preserves the cart,
// submitted orders and the stock reserved by those orders.
let state: { cart: CartLine[]; orders: Order[] } = { cart: [], orders: [] };
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
const getSnapshot = () => state;

function setCart(update: SetStateAction<CartLine[]>) {
  state = {
    ...state,
    cart: typeof update === "function" ? update(state.cart) : update,
  };
  listeners.forEach((listener) => listener());
}

function setOrders(update: SetStateAction<Order[]>) {
  state = {
    ...state,
    orders: typeof update === "function" ? update(state.orders) : update,
  };
  listeners.forEach((listener) => listener());
}

export function useMemberOrders() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);
  const count = snapshot.cart.reduce(
    (sum, line) =>
      sum + (Number.isInteger(line.quantity) && line.quantity > 0 ? line.quantity : 0),
    0,
  );
  return { ...snapshot, count, setCart, setOrders };
}