export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: 'Online' | 'Offline' | undefined;
    email: string;
    phone: string;
    address: string;
} 

export type ValidationResult = {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}

//Интерфесы для обменивания данным посредством Api
//Ответ на запрос списка заказов
export interface IOrderListResponse {
    total: number;
    items: IProduct[];
}
//Ответ на запрос отдельного заказа
export interface IOrderResponse {
    id: string;
    total: number;
}
//Создаем новый заказ (массив)
export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

