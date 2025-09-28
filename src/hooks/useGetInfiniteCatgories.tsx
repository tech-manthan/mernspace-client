import { getCategories } from "@/http/api";
import { CategoriesQueryParams, GetCategories } from "@/types/category.types";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const getCategoriesData = async (queryParams: CategoriesQueryParams) => {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter((item) => !!item[1])
  );

  const queryString = new URLSearchParams(
    filteredParams as unknown as Record<string, string>
  ).toString();

  const { data } = await getCategories(queryString);
  return data;
};

export const useGetInfiniteCategories = (search: string) => {
  return useInfiniteQuery<GetCategories>({
    queryKey: ["infiniteCategories", search],
    queryFn: ({ pageParam = 1 }) =>
      getCategoriesData({
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
