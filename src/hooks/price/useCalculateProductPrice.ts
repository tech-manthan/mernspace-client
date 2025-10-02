import { calculateProductPrice } from "@/lib/calculate-product-price";
import { CalculateProductPrice } from "@/types/common.types";
import { useMemo } from "react";

export function useCalculateProductPrice({
  choosenConfig,
  priceConfiguration,
  toppings,
}: CalculateProductPrice) {
  const productPrice = useMemo(() => {
    return calculateProductPrice({
      choosenConfig,
      priceConfiguration,
      toppings,
    });
  }, [choosenConfig, toppings, priceConfiguration]);

  return productPrice;
}
