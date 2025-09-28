import { Category } from "./category.types";
import { PriceType } from "./common.types";

export interface ProductPriceConfigurationValue {
  priceType: PriceType;
  availableOptions: {
    [key: string]: number;
  };
}

export interface ProductPriceConfiguration {
  [key: string]: ProductPriceConfigurationValue;
}

export interface ProductAttribute {
  name: string;
  value: unknown;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  tenantId: string;
  categoryId: string;
  isPublish: boolean;
  createdAt: string;
  category: Category;
}

export type GetProducts = {
  data: Product[];
  currentPage: number;
  perPage: number;
  total: number;
};

export type ProductsQueryParams = {
  perPage: number;
  currentPage: number;
  q: string;
  tenantId: string;
  categoryId: string;
  isPublish?: boolean;
};
