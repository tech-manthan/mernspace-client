"use client";

import { useState, useMemo, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check, X } from "lucide-react";
import { debounce } from "lodash";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useGetInfiniteRestaurants } from "@/hooks/api/useGetInfiniteRestaurants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRestaurant } from "@/store/features/restaurant/restaurantSlice";
import { useGetRestaurant } from "@/hooks/api/useGetRestaurant";

export default function SelectRestaurant() {
  const [open, setOpen] = useState(false);
  // const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const selectedId = useAppSelector((state) => state.restaurant.tenantId);
  const { data: restaurant } = useGetRestaurant(selectedId);
  const dispatch = useAppDispatch();

  const { data, fetchNextPage, isFetchingNextPage } =
    useGetInfiniteRestaurants(search);

  const restaurants = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);
  const total = data?.pages[0]?.total ?? 0;

  const debouncedSetSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
      }, 500),
    []
  );

  const handleInputChange = (val: string) => {
    setInputValue(val);
    debouncedSetSearch(val);
  };

  const loadMore = () => {
    if (restaurants.length < total && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!selectedId && restaurants.length > 0) {
      dispatch(setRestaurant(restaurants[0].id));
    }
  }, [dispatch, restaurants, selectedId]);

  useEffect(() => {
    return () => debouncedSetSearch.cancel(); // cleanup
  }, [debouncedSetSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-2 focus:ring-2 ring-primary"
        >
          {selectedId
            ? restaurant
              ? restaurant?.name
              : restaurants.find((r) => r.id === selectedId)?.name
            : "Select Restaurant"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <div className="relative">
            <CommandInput
              placeholder="Search restaurants..."
              className="h-9 pr-7"
              value={inputValue}
              onValueChange={handleInputChange}
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  handleInputChange(""); // reset search
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <CommandList
            className="max-h-48 overflow-y-auto"
            onScroll={(e) => {
              const target = e.currentTarget;
              if (
                target.scrollHeight - target.scrollTop <=
                target.clientHeight + 2
              ) {
                loadMore();
              }
            }}
          >
            {restaurants.length === 0 && !isFetchingNextPage && (
              <CommandEmpty>No Restaurant found.</CommandEmpty>
            )}
            {restaurants.length === 0 && isFetchingNextPage && (
              <CommandEmpty>Loading...</CommandEmpty>
            )}

            <CommandGroup key={restaurants.length}>
              {restaurants.map((restaurant) => (
                <CommandItem
                  key={restaurant.id}
                  value={String(restaurant.id)}
                  onSelect={(val) => {
                    const id = Number(val);
                    // setSelectedId(id === selectedId ? null : id);
                    dispatch(setRestaurant(id === selectedId ? null : id));

                    setOpen(false);
                  }}
                >
                  {restaurant.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedId === restaurant.id
                        ? "opacity-100 text-primary"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
