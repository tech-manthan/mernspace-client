import { CalculateProductPrice } from "@/types/common.types";

export function calculateProductPrice({
  choosenConfig,
  priceConfiguration,
  toppings,
}: CalculateProductPrice) {
  const toppingsPrice = toppings.reduce((acc, curr) => acc + curr.price, 0);

  const chosenConfigPrice = Object.entries(choosenConfig).reduce(
    (acc, [key, option]) => {
      const chosenPrice = priceConfiguration[key].availableOptions[option];

      return acc + chosenPrice;
    },
    0
  );

  return toppingsPrice + chosenConfigPrice;
}
