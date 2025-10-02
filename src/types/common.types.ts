import { ProductPriceConfiguration } from "./product.types";
import { Topping } from "./topping.types";

export type Pagination = {
  currentPage: number;
  perPage: number;
  total: number;
};

export type PriceType = "base" | "additional";

export type CalculateProductPrice = {
  choosenConfig: {
    [key: string]: string;
  };
  priceConfiguration: ProductPriceConfiguration;
  toppings: Topping[];
};
