export type Restaurant = {
  id: number;
  name: string;
  address: string;
};

export type GetRestaurants = {
  data: Restaurant[];
  currentPage: number;
  perPage: number;
  total: number;
};

export type RestaurantsQueryParams = {
  perPage: number;
  currentPage: number;
  q: string;
};
