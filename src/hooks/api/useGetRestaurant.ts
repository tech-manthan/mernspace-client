import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "@/types/restaurant.types";
import { getRestaurant } from "@/http/api";

const getRestaurantData = async (id: number) => {
  const { data } = await getRestaurant(id);
  return data;
};

export const useGetRestaurant = (id: number | null) => {
  return useQuery<Restaurant>({
    queryKey: ["getRestaurant", id],
    queryFn: getRestaurantData.bind(this, id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
