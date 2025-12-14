import { IProduct, TCategoryNames } from "../../../types"
import { CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

type TCardPreview = {
  inCard: boolean,
  buttonText: string,
} & Pick<IProduct, 'description' | 'price' | 'image' | 'category'>;
//также, как и в CardCatalog указываем тип для нажатия
type TCardPreviewActions = {
  onClick?: () => void;
};

export class CardPreview extends Card<TCardPreview>{
  protected cardText: HTMLParagraphElement;
  protected cardButton: HTMLButtonElement;
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(protected container: HTMLElement, protected actions?: TCardPreviewActions) {
    super(container);
    this.cardText = ensureElement<HTMLParagraphElement>('.card__text', this.container);
    this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    if (this.actions?.onClick) {
      this.cardButton.addEventListener('click', this.actions.onClick)
    }
  }

  set category(category: TCategoryNames) { 
    const classModOfCategory = Card.getCategoryClassByCategoryName(category);
    this.cardCategory.textContent = category;
    this.cardCategory.className = `card__category ${classModOfCategory}`;
  }
  set text(text: string) {
    this.cardText.textContent = text;
  }
  set inCard(inCard: boolean) {
    this.cardButton.disabled = !inCard;
  }
  set image(imageSrc: string) {
    this.setImage(this.cardImage, CDN_URL + imageSrc);
  }
  set buttonText(buttonText: string) {
    this.cardButton.textContent = buttonText;
  }
  // desaibledButton() {
  //   this.cardButton.disabled = true;
  //   this.cardButton.textContent = 'Недоступно';
  //   this.cardButton.removeAttribute('data-in-cart');
  // }
}