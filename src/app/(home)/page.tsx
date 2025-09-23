import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/ProductCard";

const products: Product[] = [
  {
    _id: "1",
    name: "Product 1",
    description: "Description for Product 1",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 100,
  },
  {
    _id: "2",
    name: "Product 2",
    description: "Description for Product 2",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 200,
  },
  {
    _id: "3",
    name: "Product 3",
    description: "Description for Product 3",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 150,
  },
  {
    _id: "4",
    name: "Product 4",
    description: "Description for Product 4",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 300,
  },
  {
    _id: "5",
    name: "Product 5",
    description: "Description for Product 5",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 120,
  },
  {
    _id: "6",
    name: "Product 6",
    description: "Description for Product 6",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 180,
  },
  {
    _id: "7",
    name: "Product 7",
    description: "Description for Product 7",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 250,
  },
  {
    _id: "8",
    name: "Product 8",
    description: "Description for Product 8",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 220,
  },
  {
    _id: "9",
    name: "Product 9",
    description: "Description for Product 9",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 170,
  },
  {
    _id: "10",
    name: "Product 10",
    description: "Description for Product 10",
    image:
      "https://res.cloudinary.com/damktlcfx/image/upload/v1758535912/products/a8b82c54-686b-47f0-b57e-9fd7f6cb9a28.png",
    price: 280,
  },
];
export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto flex items-center justify-between py-24">
          <div className="">
            <h1 className="text-7xl font-black font-sans">
              Super Delicious Pizza in
              <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 pz-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              src={"/pizza-main.png"}
              alt="pizza-main"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-12">
          <Tabs defaultValue="pizza">
            <TabsList>
              <TabsTrigger value="pizza" className="text-base">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-base">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
