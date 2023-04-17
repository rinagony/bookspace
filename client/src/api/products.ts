export const getAllProducts = async () => {
  return await fetch("/products").then((res) => res.json());
};
