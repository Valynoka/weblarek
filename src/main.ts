import './scss/styles.scss';
import { IProduct } from './types';
import { apiProducts } from './utils/data';

class Product {
  item: IProduct[];

  constructor() {
    this.item = [];
  }

  setItems(item: IProduct[]):void {
    this.item = item
  }
  getItems(): IProduct[] {
    return this.item
  }
}

const productsModel = new Product();
productsModel.setItems(apiProducts.items);

console.log(`Массив товаров из каталога:`, productsModel.getItems())