import { CartItem } from "@/types/cart.types";
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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      return {
        cartItems: [...state.cartItems, action.payload],
      };
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
