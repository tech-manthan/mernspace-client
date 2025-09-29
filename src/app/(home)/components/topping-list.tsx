"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ToppingCard, { Topping } from "./topping-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useGetInfiniteToppings } from "@/hooks/useGetInfiniteToppings";
import { useInView } from "react-intersection-observer";

const ToppingList = ({
  categoryId,
  tenantId,
}: {
  categoryId: string;
  tenantId: number;
}) => {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteToppings(categoryId, tenantId);

  const allToppings =
    data?.pages.flatMap((page) => page.data as Topping[]) ?? [];
  if (!allToppings.length) return null;

  // Jab last element viewport me aata hai toh next page fetch ho
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

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
          {data?.pages.map((page, pageIndex) =>
            page.data.map((topping: Topping, index: number) => {
              const isChecked = selectedToppings.some(
                (item) => item._id === topping._id
              );
              const isLast =
                pageIndex === data.pages.length - 1 &&
                index === page.data.length - 1;

              return (
                <div
                  key={topping._id}
                  ref={isLast ? ref : undefined} // last element ko observe karo
                >
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
            })
          )}
          {isFetchingNextPage && <p className="text-sm">Loading more...</p>}
        </div>
        <ScrollBar orientation="horizontal" hidden />
      </ScrollArea>
    </section>
  );
};

export default ToppingList;
