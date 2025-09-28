export type Topping = {
  _id: string;
  name: string;
  price: number;
  image: string;
  tenantId: string;
  categoryId: string;
  isPublish: boolean;
};

export type GetToppings = {
  data: Topping[];
  currentPage: number;
  perPage: number;
  total: number;
};

export type ToppingsQueryParams = {
  perPage: number;
  currentPage: number;
  tenantId: number;
  categoryId: string;
  isPublish?: boolean;
};
