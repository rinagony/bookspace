import { IProduct } from "../interfaces";

export const getAllProducts = async () => {
  return await fetch(`${process.env.REACT_APP_SERVER}/api/products`).then((response) => (response.json()));
};
