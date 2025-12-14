import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component"

type TForm = {
  error: string;
}

export class Form<T> extends Component<TForm & T> {
  protected formErrors: HTMLElement;
  protected submitFormButton: HTMLButtonElement;

  constructor(protected container: HTMLFormElement) {
    super(container);
    this.formErrors = ensureElement<HTMLElement>('.form__errors', this.container);
    this.submitFormButton = ensureElement<HTMLButtonElement>('[type="submit"]', this.container);
  }

  set error(error: string) {
    this.submitFormButton.disabled = !!error;
    this.formErrors.textContent = error;
  }
}