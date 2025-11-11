import { IApi, IProduct, IOrderListResponse, IOrderRequest, IOrderResponse } from "../../types"

export class WebLarekApi {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }
  //получаем список заказов с сервера
  async getProducts(): Promise<IProduct[]> {
    const response = await this.api.get<IOrderListResponse>('/product');
    return response.items;
  }
  //направляем заказ на сервер
  createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    const sendedOrder = this.api.post<IOrderResponse>('./order', order);
    return sendedOrder;
  }
}



