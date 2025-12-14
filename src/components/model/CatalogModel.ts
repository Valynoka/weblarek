//В этом разделе мы пишем логи обработки запросов, которые относятся к каталогу
//Мы получаем и направляем данные каталога

import { IProduct } from "../../types";
import { IEvents } from "../base/Events"

export class CatalogModel {
  private products: IProduct[] = [];
  private selectProduct: IProduct | null = null;
  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit("catalog:setProducts");
  }
  getProducts(): IProduct[] {
    return this.products;
  }
  setSelectedProduct(product: IProduct): void {
    this.selectProduct = product;
    this.events.emit('catalog:setSelectedProduct')
  }
  getSelectedProducts(): IProduct | null {
    return this.selectProduct;
  }
  getProductById(productId: string): IProduct | null {
    return this.products.find(({id}) => id === productId) || null; //возвращаем выражение справа если занчение равно null
  }
}
