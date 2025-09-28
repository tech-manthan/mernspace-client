import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import {
  GetRestaurants,
  RestaurantsQueryParams,
} from "@/types/restaurant.types";
import { getRestaurants } from "@/http/api";

const getTenantsData = async (queryParams: RestaurantsQueryParams) => {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter((item) => !!item[1])
  );

  const queryString = new URLSearchParams(
    filteredParams as unknown as Record<string, string>
  ).toString();

  const { data } = await getRestaurants(queryString);
  return data;
};

export const useGetInfiniteRestaurants = (search: string) => {
  return useInfiniteQuery<GetRestaurants>({
    queryKey: ["infiniteRestaurants", search],
    queryFn: ({ pageParam = 1 }) =>
      getTenantsData({
        perPage: 10,
        q: search,
        currentPage: pageParam as number,
      }),

    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.perPage);
      if (lastPage.currentPage < totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });
};
