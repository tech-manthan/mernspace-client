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
      const cartItems = [...state.cartItems, action.payload];
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
