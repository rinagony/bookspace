export interface IProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  inStock: boolean;
  price: number;
  image: string;
}

export interface IProductSelected extends IProduct {
  amount: number;
}

export interface IUser {
  name: string;
  lastName: string;
}

export interface IInitialStateProducts {
  products: IProduct[],
  productsSelected: IProductSelected[],
  loading: boolean;
  error: any;
}

export interface IAboutItem {
  image: string;
  title: string;
}

export interface IInitialStateAbout {
  aboutInfo: IAboutItem[]
}
