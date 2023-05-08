import { Dayjs } from "dayjs";

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

export interface IInitialStateAbout {
  aboutInfo: IAbout | null;
}

export interface IPackage {
  title: string;
  secondaryTitle: string;
  description: string[];
  price: number;
  image: string;
  icon: React.ReactNode;
  date?: string;
}

export interface IModalReservation{
  show: boolean;
  item: IPackage | null;
}

export interface IAbout {
  aboutHeader1: string;
  aboutParagraph1:  string;
  aboutHeader2:  string;
  aboutParagraph2: string;
  aboutHeader3:  string;
  aboutParagraph3:  string;
  images: string[]
}