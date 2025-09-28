import { getToppings } from "@/http/api";
import { GetToppings, ToppingsQueryParams } from "@/types/topping.types";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const getToppingsData = async (queryParams: ToppingsQueryParams) => {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter((item) => !!item[1])
  );

  const queryString = new URLSearchParams(
    filteredParams as unknown as Record<string, string>
  ).toString();

  const { data } = await getToppings(queryString);
  return data;
};

export const useGetInfiniteToppings = (
  categoryId: string,
  tenantId: number
) => {
  return useInfiniteQuery<GetToppings>({
    queryKey: ["infiniteToppings", categoryId, tenantId],
    queryFn: ({ pageParam = 1 }) =>
      getToppingsData({
        perPage: 10,
        currentPage: pageParam as number,
        categoryId,
        tenantId,
        isPublish: true,
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
