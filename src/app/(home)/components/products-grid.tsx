"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import {
  Pagination as Pager,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import ProductCard from "./product-card";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ProductsGridProps = {
  activeCategory: string;
};

const ProductsGrid = ({ activeCategory }: ProductsGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetProducts({
    currentPage,
    perPage: 8,
    categoryId: activeCategory,
    tenantId: "1",
    q: search,
    isPublish: true,
  });

  const debounceSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
        setCurrentPage(1);
      }, 500),
    []
  );

  const handleInputValueChange = (val: string) => {
    setInputValue(val);
    debounceSearch(val);
  };

  const products = data?.data ?? [];
  const pagination = {
    currentPage: data?.currentPage ?? 1,
    perPage: data?.perPage ?? 8,
    total: data?.total ?? 0,
  };

  const totalPages = Math.ceil(pagination.total / pagination.perPage);

  const getPages = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <>
      <div className="relative w-80 my-2">
        <Input
          type="text"
          value={inputValue}
          placeholder="Search Product"
          onChange={(e) => {
            handleInputValueChange(e.target.value);
          }}
          className="px-9 w-full"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        {inputValue && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => handleInputValueChange("")}
          >
            <X className="size-5 text-gray-500" />
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="w-full h-64 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {pagination.total > pagination.perPage && (
            <div className="mt-6 flex justify-center">
              <Pager>
                <PaginationContent>
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {/* Pages */}
                  {getPages()[0] > 1 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {getPages()[0] > 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}

                  {getPages().map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {getPages()[getPages().length - 1] < totalPages && (
                    <>
                      {getPages()[getPages().length - 1] < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage !== totalPages) {
                          handlePageChange(currentPage + 1);
                        }
                      }}
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pager>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductsGrid;
