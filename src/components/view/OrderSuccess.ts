import { IGetOrderApiResponse } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { IEvents } from "../base/Events";

type TOrderSuccess = Pick<IGetOrderApiResponse, 'total'>;

export class OrderSuccess extends Component<TOrderSuccess> {
  protected orderSuccessDescription: HTMLElement;
  protected orderSuccessClose: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.orderSuccessDescription = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.orderSuccessClose = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.orderSuccessClose.addEventListener('click', () => {
      this.events.emit('order:successClickClose')
    });
  }
  set total(total: number) {
    this.orderSuccessDescription.textContent = `Списано ${total} синапсов`;
  }
}