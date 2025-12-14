import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"

type TModal = {
  content: HTMLElement;
}

export class Modal extends Component<TModal>{
  protected modalCloseButton: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container);
    this.modalCloseButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
    this.modalCloseButton.addEventListener('click', () => this.close());
    this.container.addEventListener('click', (e: MouseEvent) => {
      if(e.target === this.container) {
        this.close()
      }
    })
  }
  open() {
    this.container.classList.add('modal_active');
  }
  close() {
    this.container.classList.remove('modal_active');
    this.modalContent.replaceChildren();
  }
  set content(content: HTMLElement) {
    this.modalContent.replaceChildren(content);
    this.open();
  }
}