import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { IEvents } from "../base/Events";

type TBasket = {
  items: HTMLElement[];
  totalPrice: number;
}

export class Basket extends Component<TBasket> {
  protected basketList: HTMLUListElement;
  protected basketButton: HTMLButtonElement;
  protected basketPrice: HTMLElement;

  constructor(
    protected container: HTMLElement, 
    protected events: IEvents,
  ) {
    super(container);
    this.basketList = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.basketButton.addEventListener('click', () => {
      this.events.emit('basket:checkout');
    })
  }
  // set items(items: HTMLElement[]) {
  //   if(items.length === 0) {
  //     this.basketList.innerHTML = '<div>Нет товаров в корзине</div>';
  //     this.basketList.classList.add('basket__list_empty');
  //     this.basketList.classList.remove('basket__list_scroll');
  //     this.basketButton.disabled = true;
  //   } else {
  //     this.basketList.classList.remove('basket__list_empty');
  //     this.basketButton.disabled = false;
  //     this.basketList.replaceChildren(...items);
  //   }
  // }
  set items(items: HTMLElement[]) {
    this.basketList.replaceChildren(...items);
  }
  set totalPrice(totalPrice: number) { 
    if (totalPrice === 0) {
      this.basketButton.disabled = true;
    } else {
      this.basketButton.disabled = false;
    }
    this.basketPrice.textContent = `${totalPrice} синапсов`;
  }
}