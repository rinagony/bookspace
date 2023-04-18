export interface IProduct {
    id: string,
    title: string,
    category: string,
    description: string,
    inStock: boolean,
    price: number,
    image: string
}

export interface IUser {
  name: string;
  lastName: string;
}