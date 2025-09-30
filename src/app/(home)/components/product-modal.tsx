import { Product } from "@/types/product.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import ToppingList from "./topping-list";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startTransition, useState } from "react";
import { Topping } from "@/types/topping.types";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/features/cart/cartSlice";
import { toast } from "sonner";

interface ChoosenConfig {
  [key: string]: string;
}

const ProductModal = ({ product }: { product: Product }) => {
  const defaultConfig = Object.entries(product.category.priceConfiguration)
    .map(([key, value]) => {
      return {
        [key]: value.availableOptions[0],
      };
    })
    .reduce((prev, current) => {
      return {
        ...prev,
        ...current,
      };
    }, {});
  const [choosenConfig, setChoosenConfig] =
    useState<ChoosenConfig>(defaultConfig);

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const dispatch = useAppDispatch();

  function handleChoosenConfig(key: string, value: string) {
    startTransition(() => {
      setChoosenConfig((prev) => {
        return { ...prev, [key]: value };
      });
    });
  }

  const handleToppingToggle = (topping: Topping, checked: boolean) => {
    startTransition(() => {
      setSelectedToppings((prev) =>
        checked
          ? [...prev, topping]
          : prev.filter((item) => item._id !== topping._id)
      );
    });
  };

  function handleAddToCart() {
    dispatch(
      addToCart({
        product: product,
        choosenConfiguration: {
          priceConfiguration: choosenConfig,
          selectedToppings: selectedToppings,
        },
        qty: 1,
      })
    );
    toast.success("product added to cart");
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <div className="flex">
          <div className="w-1/3 bg-white rounded-l-lg p-8 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={450}
              height={450}
              className="mx-auto"
              unoptimized
            />
          </div>
          <div className="w-2/3 p-8">
            <DialogTitle className="text-xl font-bold">
              {product.name}
            </DialogTitle>
            <DialogDescription className="mt-1 line-clamp-3 break-words">
              {product.description}
            </DialogDescription>
            <div className="text-sm mt-2 flex items-center flex-wrap gap-x-2">
              {product.attributes.map((attribute) => {
                return (
                  <div key={attribute.name}>
                    <Badge variant={"outline"} className="px-3 py-2">
                      <span className="font-semibold">{attribute.name}</span>:
                      <span className="text-primary">
                        {attribute.value as string}
                      </span>
                    </Badge>
                  </div>
                );
              })}
            </div>

            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => {
                // handleChoosenConfig(key, value.availableOptions[0]);
                return (
                  <div className="mt-6" key={key}>
                    <h4 className="text-base font-semibold">
                      Choose the {key}
                    </h4>

                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      onValueChange={(data) => {
                        handleChoosenConfig(key, data);
                      }}
                      className="grid grid-cols-3 gap-4 mt-2"
                    >
                      {value.availableOptions.map((option) => {
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                              aria-label="Large"
                            />
                            <Label
                              htmlFor={option}
                              className="flex items-center justify-center rounded border-2 bg-white px-4 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                );
              }
            )}

            <div className="mt-6">
              <ToppingList
                categoryId={product.categoryId}
                tenantId={Number(product.tenantId)}
                selectedToppings={selectedToppings}
                handleToppingToggle={handleToppingToggle}
              />
            </div>

            <div className="mt-8 flex justify-between items-center">
              <span className="font-bold text-lg">₹ 400</span>
              <DialogClose asChild>
                <Button
                  className="rounded hover:cursor-pointer"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart />
                  <span>Add to cart</span>
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
