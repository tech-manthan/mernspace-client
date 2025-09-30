import { Product } from "./product.types";
import { Topping } from "./topping.types";

export interface CartItem {
  product: Product;
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  qty: number;
}
