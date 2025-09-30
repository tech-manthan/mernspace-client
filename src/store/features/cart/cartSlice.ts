import { getCartItemHash } from "@/lib/get-cart-item-hash";
import { CartItem, CartItemAdd } from "@/types/cart.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemAdd>) => {
      const hash = getCartItemHash(action.payload);
      const cartItems = [
        ...state.cartItems,
        { ...action.payload, qty: 1, hash: hash },
      ];
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        cartItems: cartItems,
      };
    },
    setInitialCart: (state, action: PayloadAction<CartItem[]>) => {
      return {
        cartItems: action.payload,
      };
    },
  },
});

export const { addToCart, setInitialCart } = cartSlice.actions;

export default cartSlice.reducer;
