import { getProducts } from "@/http/api";
import { GetProducts, ProductsQueryParams } from "@/types/product.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const getProductsData = async (queryString: string) => {
  const { data } = await getProducts(queryString);
  return data;
};

export const useGetProducts = (
  queryParams: ProductsQueryParams = {
    currentPage: 1,
    perPage: 8,
    q: "",
    categoryId: "",
    tenantId: "",
    isPublish: true,
  }
) => {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([_, value]) => {
        return (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          value !== "undefined"
        );
      })
      .map(([key, value]) => [key, String(value)])
  );

  const queryString = new URLSearchParams(filteredParams).toString();
  return useQuery<GetProducts>({
    queryKey: ["getProducts", queryParams],
    queryFn: getProductsData.bind(this, queryString),
    placeholderData: keepPreviousData,
  });
};
