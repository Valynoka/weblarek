import { IBuyer } from "../../../types"
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

type TContactsForm = Pick<IBuyer, 'email' | 'phone'>;

export class ContactsForm extends Form<TContactsForm> {
  protected formEmailInput: HTMLInputElement;
  protected formPhoneInput: HTMLInputElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents,) {
    super(container);
    this.formEmailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.formPhoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    this.formEmailInput.addEventListener('input', () => {
      this.events.emit<Pick<IBuyer, 'email'>>('contact:formSetEmail', {
        email: this.formEmailInput.value,
      })
    });
    this.formPhoneInput.addEventListener('input', () => {
      this.events.emit<Pick<IBuyer, 'phone'>>('contact:formSetPhone', {
        phone: this.formPhoneInput.value,
      })
    });
    this.container.addEventListener('submit', (evt: SubmitEvent) => {
      evt.preventDefault();
      this.events.emit('contact:formSubmit')
    })
  }

  set email(email: string) {
    this.formEmailInput.value = email;
  }
  set phone(phone: string) {
    this.formPhoneInput.value = phone;
  }
}