import { CartItemHash } from "@/types/cart.types";
import CryptoJS from "crypto-js";

export function getCartItemHash(cartItem: CartItemHash): string {
  try {
    const jsonString = JSON.stringify(cartItem);
    const hash = CryptoJS.SHA256(jsonString).toString();
    return hash;
  } catch (error) {
    console.error(error);
    return "";
  }
}
