import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

type TCardBasketData = {
  index: number
};
//также, как и в CardCatalog указываем тип для нажатия на корзину
type TBasketAction = {
  onClick?: () => void;
};

export class CardBasket extends Card<TCardBasketData> {
  protected basketItemIndex: HTMLSpanElement;
  protected basketButtonDelete: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected actions?: TBasketAction) {
    super(container);
    this.basketItemIndex = ensureElement<HTMLSpanElement>('.basket__item-index', this.container);
    this.basketButtonDelete = ensureElement<HTMLButtonElement>('.card__button', this.container);
    if (this.actions?.onClick) {
      this.basketButtonDelete.addEventListener('click', this.actions.onClick)
    }
  }
  set index(index: number) {
    this.basketItemIndex.textContent = index.toString();
  }
}