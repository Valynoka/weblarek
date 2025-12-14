import { IApi, IOrderApiRequest, IGetProductsListFromApiResponse, IGetOrderApiResponse } from "../../types";

export class ServerApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IGetProductsListFromApiResponse> {
    return await this.api.get<IGetProductsListFromApiResponse>('/product');
  }
  async order(data: IOrderApiRequest): Promise<IGetOrderApiResponse> {
    return await this.api.post('/order', data);
  }
}