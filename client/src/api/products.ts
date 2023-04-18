import { IProduct } from "../interfaces";

export const getAllProducts = async () => {
  return await fetch("/products").then((response) => (response.json()));
};
