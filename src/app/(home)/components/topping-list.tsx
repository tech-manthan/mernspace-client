"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ToppingCard, { Topping } from "./topping-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const toppings: Topping[] = [
  {
    _id: "68d26b18a1d29abea5fe9c7b",
    name: "Chicken",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 200,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "78e36c29b2e30cdea6fe1c8c",
    name: "Paneer",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 180,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "88f46d39c3f41defb7fe2d9d",
    name: "Cheese Burst",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 150,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "98g57e40d4g52efgc8fe3e0e",
    name: "Mushroom",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 120,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "a9h68f51e5h63fghd9fe4f1f",
    name: "Olives",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 100,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "b0i79g62f6i74ghie0fe5g2g",
    name: "Capsicum",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 90,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "c1j80h73g7j85hijf1fe6h3h",
    name: "Corn",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 110,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "d2k91i84h8k96ijjg2fe7i4i",
    name: "Pepperoni",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 220,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
  {
    _id: "e3l02j95i9l07jkkh3fe8j5j",
    name: "Sausage",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 210,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: false,
  },
  {
    _id: "f4m13k06j0m18kllj4fe9k6k",
    name: "Onion",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1/toppings/5d2f7a56-65b9-4423-98ec-01174de7e822.webp",
    price: 80,
    tenantId: "1",
    categoryId: "68cf06f44a5b1b5ce5e14172",
    isPublish: true,
  },
];

const ToppingList = () => {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>(
    toppings.length > 0 ? [toppings[0]] : []
  );

  const handleToggle = (topping: Topping, checked: boolean) => {
    setSelectedToppings((prev) =>
      checked
        ? [...prev, topping]
        : prev.filter((item) => item._id !== topping._id)
    );
  };

  return (
    <section className="w-full max-w-sm">
      <h4 className="text-lg font-semibold">Extra Toppings</h4>
      <ScrollArea className="w-full whitespace-nowrap mt-2">
        <div className="flex w-max gap-x-4 px-1">
          {toppings.map((topping) => {
            // const isChecked = !!selectedToppings.find(
            //   (item) => item._id === topping._id
            // );
            const isChecked = selectedToppings.some(
              (item) => item._id === topping._id
            );
            return (
              <div key={topping._id}>
                <Checkbox
                  id={topping._id}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleToggle(topping, checked as boolean)
                  }
                  className="hidden"
                />
                <Label htmlFor={topping._id}>
                  <ToppingCard topping={topping} isSelected={isChecked} />
                </Label>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" hidden />
      </ScrollArea>
    </section>
  );
};

export default ToppingList;
