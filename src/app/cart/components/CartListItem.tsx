import { Button } from "@/components/ui/button";
import { useCalculateProductPrice } from "@/hooks/price/useCalculateProductPrice";
import {
  decreaseCartItemQuanity,
  increaseCartItemQuantity,
  removeCartItem,
} from "@/store/features/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { CartItem } from "@/types/cart.types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const CartListItem = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();

  const priceConfigNames = Object.keys(
    item.choosenConfiguration.priceConfiguration
  );
  const toppingNames = item.choosenConfiguration.selectedToppings.map(
    (topping) => topping.name
  );
  const itemsTotal =
    useCalculateProductPrice({
      choosenConfig: item.choosenConfiguration.priceConfiguration,
      priceConfiguration: item.priceConfiguration,
      toppings: item.choosenConfiguration.selectedToppings,
    }) * item.qty;

  function handleIncreaseQuantity() {
    dispatch(increaseCartItemQuantity(item.hash));
  }

  function handleDecreaseQuantity() {
    dispatch(decreaseCartItemQuanity(item.hash));
  }

  function handleRemoveItem() {
    dispatch(removeCartItem(item.hash));
  }
  return (
    <div
      key={item.hash}
      className="border-b pb-8 flex justify-between items-center"
    >
      <div className="flex-1 flex gap-4">
        <Image
          src={item.image}
          width={100}
          height={100}
          alt={item.name}
          unoptimized
        />
        <div>
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p className="text-sm text-gray-500">{priceConfigNames.join(", ")}</p>
          <p className="text-sm text-gray-500">{toppingNames.join(", ")}</p>
        </div>
      </div>
      <div className="flex mx-10 justify-end items-center">
        <div className="flex bg-gray-100 justify-center items-center rounded-full gap-2">
          <Button
            variant={"secondary"}
            size={"lg"}
            className="rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200"
            onClick={handleDecreaseQuantity}
          >
            <Minus />
          </Button>

          <p className="text-xl min-w-[20px] text-center">{item.qty}</p>

          <Button
            variant={"secondary"}
            size={"lg"}
            className="rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200"
            onClick={handleIncreaseQuantity}
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3 items-center">
        <h4 className="my-6 w-[100px] text-end text-xl font-bold">
          ₹ {itemsTotal}
        </h4>
        <Button variant={"ghost"} size={"lg"} onClick={handleRemoveItem}>
          <Trash2 className="size-5 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default CartListItem;
