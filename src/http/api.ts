import { api, AUTH_SERVICE, CATALOG_SERVICE } from "./client";

export const getRestaurants = (queryString: string) =>
  api.get(`/${AUTH_SERVICE}/tenants?${queryString}`);

export const getRestaurant = (id: number) =>
  api.get(`/${AUTH_SERVICE}/tenants/${id}`);

export const getCategories = (queryString: string) =>
  api.get(`/${CATALOG_SERVICE}/categories?${queryString}`);

export const getProducts = (queryString: string) =>
  api.get(`/${CATALOG_SERVICE}/products?${queryString}`);

export const getToppings = (queryString: string) =>
  api.get(`/${CATALOG_SERVICE}/toppings?${queryString}`);
