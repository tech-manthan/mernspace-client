import { Product } from "@/types/product.types";

export function getProductMinimumPrice(product: Product): number {
  return (
    Object.entries(product.priceConfiguration)
      // .filter(([, value]) => value.priceType === "base")
      .reduce((acc, [, value]) => {
        const smallestPrice = Math.min(
          ...Object.values(value.availableOptions)
        );
        return acc + smallestPrice;
      }, 0)
  );
}
