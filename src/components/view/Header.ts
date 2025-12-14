import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { IEvents } from "../base/Events";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected headerBasketButton: HTMLButtonElement;
  protected headerBasketCounter: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.headerBasketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.headerBasketCounter = ensureElement<HTMLElement>('.header__basket-counter', this.container);

    this.headerBasketButton.addEventListener('click', () => {
      this.events.emit('basket:open')
    });
  }

  set counter(num: number) {
    this.headerBasketCounter.textContent = String(num);
  }
}