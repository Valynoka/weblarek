import { IProduct } from "../../types";

export class Catalog {
  products: IProduct[];
  selectProduct: IProduct | null; 
  
  constructor() {
    this.products = [];
    this.selectProduct = null;
  }

  setProducts(products: IProduct[]):void {
    this.products = products;
  }
  getProducts():IProduct[] {
    return this.products;
  }
  setSelectedProduct(product: IProduct):void {
    this.selectProduct = product;
  }
  getSelctedProduts():IProduct | null {
    return this.selectProduct;
  }
  getProductById():IProduct | null {
    return this.selectProduct;
  } 
}