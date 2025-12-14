import { categoryMap } from "../utils/constants";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

//Тип выбора способов оплаты
export type TPayment = 'card' | 'cash' | '';

export type ValidationResult = {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}
//Интерфейс карточки товаров
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
//Интерфейс покупателей
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
} 
//Интерфейс заказов
export interface IOrder {
  id: string;
  total: number
}
//Интерфейс товаров, который возвращаются из Апи (массив)
export interface IGetProductsListFromApiResponse {
  total: number;
  items: IProduct[];
}
//Интерфейс заказа направляемого на сервер для обработки (АПИ)
export interface IOrderApiRequest extends IBuyer{
  total: number;
  items: string[];
}
//Интерфейс заказа возвращаемого с сервера
export interface IGetOrderApiResponse {
  id: number;
  total: number;
}
export interface IErrorApiResponse {
  error: string;
}
export type TCategoryNames = keyof typeof categoryMap;