"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import CartListItem from "./cart-list-item";
import { clearCart } from "@/store/features/cart/cartSlice";
import { useCalculateCartItemsPrice } from "@/hooks/price/useCalculateCartItemsPrice";

const CartList = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const totalPrice = useCalculateCartItemsPrice(cartItems);

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {cartItems.length > 0 && (
          <Button className="text-base font-bold" onClick={handleClearCart}>
            Clear
          </Button>
        )}
      </div>
      {!cartItems.length ? (
        <Card className="flex h-80 p-8 mt-6 text-center bg-transparent border-dashed border-2 justify-center">
          <CardHeader>
            <CardTitle className="text-2xl flex flex-col items-center">
              <ShoppingCart className="text-gray-500 size-10" />
              <span>No Products found in Cart</span>
            </CardTitle>
            <CardDescription className="text-lg w-96 mx-auto">
              We couldn&apos;t find any item in the cart. Add some items in cart
            </CardDescription>
            <CardFooter className="flex justify-center items-center">
              <Link href={"/"} className="text-primary">
                Continue Shopping?
              </Link>
            </CardFooter>
          </CardHeader>
        </Card>
      ) : (
        <Card className="rounded-sm">
          <CardContent className="flex flex-col gap-8">
            {cartItems.map((item) => {
              return <CartListItem key={item.hash} item={item} />;
            })}
          </CardContent>
          <CardFooter className="flex justify-between">
            <h3 className="my-6 text-2xl font-bold">₹ {totalPrice}</h3>
            <Button size={"lg"} asChild>
              <Link href={"/checkout"}>
                <span className="text-base font-semibold">Checkout</span>
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CartList;
