import { calculateProductPrice } from "@/lib/calculate-product-price";
import { CartItem } from "@/types/cart.types";
import { useMemo } from "react";

export function useCalculateCartItemsPrice(cartItems: CartItem[]) {
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = calculateProductPrice({
        choosenConfig: item.choosenConfiguration.priceConfiguration,
        priceConfiguration: item.priceConfiguration,
        toppings: item.choosenConfiguration.selectedToppings,
      });

      return acc + itemPrice * item.qty;
    }, 0);
  }, [cartItems]);

  return totalPrice;
}
