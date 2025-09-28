import { PriceType } from "./common.types";

export type CategoryWidgetType = "switch" | "radio";

export interface CategoryPriceConfigurationValue {
  priceType: PriceType;
  availableOptions: string[];
}

export interface CategoryPriceConfiguration {
  [key: string]: CategoryPriceConfigurationValue;
}

export interface CategoryAttribute {
  name: string;
  widgetType: CategoryWidgetType;
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: CategoryPriceConfiguration;
  attributes: CategoryAttribute[];
}

export type GetCategories = {
  data: Category[];
  currentPage: number;
  perPage: number;
  total: number;
};

export interface CategoriesQueryParams {
  perPage: number;
  currentPage: number;
  q: string;
}
