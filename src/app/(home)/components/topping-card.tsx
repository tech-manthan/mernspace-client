import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

import Image from "next/image";

export type Topping = {
  _id: string;
  name: string;
  image: string;
  isPublish: boolean;
  price: number;
  tenantId: string;
  categoryId: string;
};

type ToppingCardPropTypes = {
  topping: Topping;
  isSelected: boolean;
};

const ToppingCard = ({ topping, isSelected }: ToppingCardPropTypes) => {
  return (
    <Card
      className={`border-2 p-0 my-1 rounded w-32 relative ${
        isSelected && "border-primary"
      }`}
    >
      {isSelected && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <CardHeader className="mt-2">
        <Image
          src={topping.image}
          alt={topping.name}
          width={80}
          height={80}
          className="mx-auto"
          unoptimized
        />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center mb-2">
        <h5 className="text-sm break-words">{topping.name}</h5>
        <p className="text-base font-medium">₹ {topping.price}</p>
      </CardContent>
    </Card>
  );
};

export default ToppingCard;
