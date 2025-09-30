import { Product } from "./product.types";
import { Topping } from "./topping.types";

export interface CartItem
  extends Pick<
    Product,
    "_id" | "name" | "categoryId" | "tenantId" | "image" | "priceConfiguration"
  > {
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  qty: number;
  hash: string;
}

export type CartItemHash = Omit<CartItem, "qty" | "hash">;

export type CartItemAdd = Omit<CartItem, "qty" | "hash">;
