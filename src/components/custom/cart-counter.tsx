"use client";

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/store/hooks";

const CartCounter = () => {
  const cartItemsLength = useAppSelector(
    (state) => state.cart.cartItems.length
  );
  return (
    <div className="relative">
      <Link href={"/cart"} className="hover:text-primary duration-300">
        <ShoppingBasket />
      </Link>
      <Badge className="h-6 w-6 rounded-full px-1 font-mono tabular-nums absolute -top-4 -right-5">
        {cartItemsLength}
      </Badge>
    </div>
  );
};

export default CartCounter;
