import { IProduct } from "../../types";
import { IEvents } from "../base/Events";



export class BasketModel {
  private stuffs: IProduct[] = [];

  constructor (protected events: IEvents) {
    this.events = events;
  }

  getStuffs(): IProduct[] {
    return this.stuffs;
  }
  addStuff(stuff: IProduct): void {
    this.stuffs.push(stuff);
    this.events.emit('basket:addStuff')
  }
  dellStuff(stuffToDell: IProduct): void {
    this.stuffs = this.stuffs.filter(({id}) => id !== stuffToDell.id);
    this.events.emit('basket:dellItem');
  }
  clear(): void {
    this.stuffs = [];
    this.events.emit('basket:clear');
  }
  getTotalStuffsPrice(): number {
    return this.stuffs.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0)
  }
  getTotalStuffsCount(): number {
    return this.stuffs.length;
  }
  hasStuff(stuffId: string): boolean {
    return this.stuffs.some(({id}) => id === stuffId);
  }
}