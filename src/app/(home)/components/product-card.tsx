import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import { Product } from "@/types/product.types";
import ProductModal from "./product-modal";
import { getProductMinimumPrice } from "@/lib/get-product-minimum-price";

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
          unoptimized
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-4">
        <p>
          <span>From </span>
          <span className="font-bold">₹ {getProductMinimumPrice(product)}</span>
        </p>
        <ProductModal product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
