import { IProduct } from "../../types"

export class ShoppingСard {

  stuff: IProduct[]

  constructor() {
    this.stuff = [];
  }


  addStuff(product: IProduct):void {
    this.stuff.push(product)
  }
  dellStuff(productId: string):void {
    this.stuff = this.stuff.filter(item => item.id !== productId)
  } 
  getCountStuffs():number {
    return this.stuff.length;
  }
  getStuffs():IProduct[] {
    return this.stuff
  }
  getPriceStuffs():number {
    let totalCount = 0;
    for(const item of this.stuff) {
      totalCount += item.price || 0;
    }
    return totalCount
  }
  availableStuff(productId: string):boolean {
    for (const item of this.stuff) {
      if (item.id === productId) {
        return true
      }
    }
    return false;
  }
  clear(): void {
    this.stuff = [];
  }
}