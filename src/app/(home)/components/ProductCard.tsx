import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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
        <Button className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
