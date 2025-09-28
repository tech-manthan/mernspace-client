"use client";

import { useEffect, useState, useMemo } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetInfiniteCategories } from "@/hooks/useGetInfiniteCatgories";
import ProductsGrid from "./products-grid";
import { useInView } from "react-intersection-observer";

const ProductList = () => {
  const { ref: productListRef, inView: productListInView } = useInView({
    triggerOnce: true, // ek baar hi trigger ho
    threshold: 0.1, // 10% visible hote hi trigger ho jaye
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteCategories("");

  const categories = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const [activeCategory, setActiveCategory] = useState("");

  // 👇 useInView for last category
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: "100px", // thoda pehle hi trigger ho
  });

  // when last category comes in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]._id);
    }
  }, [categories, activeCategory]);

  return (
    <div ref={productListRef}>
      {productListInView && (
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="border-0"
        >
          <ScrollArea className="w-full overflow-x-auto">
            <TabsList className="flex">
              {categories.map((cat, i) => {
                const isLast = i === categories.length - 1;
                return (
                  <TabsTrigger
                    key={cat._id}
                    value={cat._id}
                    ref={isLast ? ref : null} // 👈 last element observe
                    className="cursor-pointer"
                  >
                    {cat.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <ScrollBar orientation="horizontal" hidden />
          </ScrollArea>

          {categories.map((cat) => (
            <TabsContent key={cat._id} value={cat._id}>
              <ProductsGrid activeCategory={cat._id} />
            </TabsContent>
          ))}

          {isFetchingNextPage && (
            <p className="text-center text-sm mt-2">
              Loading more categories...
            </p>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default ProductList;
