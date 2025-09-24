import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
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

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type ProductCardPropTypes = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardPropTypes) => {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader>
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="mx-auto"
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-4">
        <p>
          <span>From </span>
          <span className="font-bold">₹ {product.price}</span>
        </p>
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
                />
              </div>
              <div className="w-2/3 p-8">
                <DialogTitle className="text-xl font-bold">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="mt-1">
                  {product.description}
                </DialogDescription>
                <div className="mt-6">
                  <h4 className="text-base">Choose the size</h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem
                        value="small"
                        id="small"
                        className="peer sr-only"
                        aria-label="Small"
                      />
                      <Label
                        htmlFor="small"
                        className="flex items-center justify-center rounded border-2 bg-white px-4 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Small
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="medium"
                        id="medium"
                        className="peer sr-only"
                        aria-label="Medium"
                      />
                      <Label
                        htmlFor="medium"
                        className="flex items-center justify-center rounded border-2 bg-white px-4 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Medium
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="large"
                        id="large"
                        className="peer sr-only"
                        aria-label="Large"
                      />
                      <Label
                        htmlFor="large"
                        className="flex items-center justify-center rounded border-2 bg-white px-4 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-6">
                  <h4 className="text-base">Choose the crust</h4>
                  <RadioGroup
                    defaultValue="thin"
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem
                        value="thin"
                        id="thin"
                        className="peer sr-only"
                        aria-label="Thin"
                      />
                      <Label
                        htmlFor="thin"
                        className="flex items-center justify-center rounded border-2 bg-white px-4 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Thin
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="thick"
                        id="thick"
                        className="peer sr-only"
                        aria-label="Thick"
                      />
                      <Label
                        htmlFor="thick"
                        className="flex items-center justify-center rounded border-2 bg-white px-4 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Thick
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-6">
                  <ToppingList />
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <span className="font-bold text-lg">₹ 400</span>
                  <Button className="rounded hover:cursor-pointer">
                    <ShoppingCart />
                    <span>Add to cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
