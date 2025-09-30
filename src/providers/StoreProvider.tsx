"use client";
import { setInitialCart } from "@/store/features/cart/cartSlice";
import { setRestaurant } from "@/store/features/restaurant/restaurantSlice";
import { AppStore, makeStore } from "@/store/store";
import { CartItem } from "@/types/cart.types";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    try {
      const cartItems = window.localStorage.getItem("cartItems");
      const tenantId = window.localStorage.getItem("tenantId");

      if (tenantId) {
        const parsedTenantId: number = JSON.parse(tenantId);
        storeRef.current?.dispatch(setRestaurant(parsedTenantId));
      }

      if (cartItems) {
        const parsedCartItems: CartItem[] = JSON.parse(cartItems);
        storeRef.current?.dispatch(setInitialCart(parsedCartItems));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
