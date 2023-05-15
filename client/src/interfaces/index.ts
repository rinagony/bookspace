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
  products: IProduct[];
  productsSelected: IProductSelected[];
  loading: boolean;
  error: any;
}

export interface IInitialStateAbout {
  aboutInfo: IAbout;
  loading: boolean;
  error: any;
}

export interface IPackage {
  title: string;
  secondaryTitle: string;
  description: string[];
  price: number;
  image: string;
  date?: string;
}

export interface IModalReservation {
  show: boolean;
  item: IPackage | null;
}

export interface IAbout {
  aboutHeader1: string;
  aboutParagraph1: string;
  aboutHeader2: string;
  aboutParagraph2: string;
  aboutHeader3: string;
  aboutParagraph3: string;
  images: string[];
  aboutHeader4: string;
  packages: IPackage[];
}

export interface IReservationInfo {
  packageTitle: string;
  email: string;
  lastName: string;
  name: string;
  phone: string;
  date: string | undefined;
}

export interface IBarMenu {
  title: string;
  composition: string;
  price: number;
}

export interface IInitialStateBar {
  barInfo: {
    images: string[];
    title: string;
    description: string;
    subtitle: string;
    descrition2: string[];
    subtitle2: string;
    phone: string;
    email: string;
    menu: IBarMenu[]
  };
  loading: boolean;
  error: string | undefined;
}

export interface IBarResrvationUserInfo {
  email: string;
  lastName: string;
  name: string;
  date: string;
  people: number;
  phone: string;
}