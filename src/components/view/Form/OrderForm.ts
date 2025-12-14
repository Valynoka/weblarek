import { IBuyer, TPayment } from "../../../types"
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

type TOrderForm = Pick<IBuyer, 'address' | 'payment'>;

export class OrderForm extends Form<TOrderForm>{
  protected paymentButton: HTMLButtonElement[];
  protected orderAddressInput: HTMLInputElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents,) {
    super(container);
    this.orderAddressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this.paymentButton = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
    this.paymentButton.forEach((orderButton: HTMLButtonElement) => {
      orderButton.addEventListener('click', (evt) => {
        const target = evt.target as HTMLButtonElement;
        const payment = target.name as TPayment;
        this.events.emit<Pick<IBuyer, 'payment'>>('order:formSetPayment', {
          payment,
        });
      });
    });
    this.orderAddressInput.addEventListener('input', () => {
      this.events.emit<Pick<IBuyer, 'address'>>('order:formSetAddress', {
        address: this.orderAddressInput.value,
      });
    });
    this.container.addEventListener('submit', (evt: SubmitEvent) => {
      evt.preventDefault();
      this.events.emit('order:formSubmit');
    });
  }
  set payment(payment: TPayment) {
    this.paymentButton.forEach((orderBtn: HTMLButtonElement) => {
      const nameOfButton = orderBtn.name as TPayment;
      orderBtn.classList.toggle('button_alt-active', nameOfButton === payment);
    });
  }
  set address(address: string) {
    this.orderAddressInput.value = address;
  }
}