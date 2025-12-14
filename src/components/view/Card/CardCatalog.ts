import { IProduct, TCategoryNames } from "../../../types";
import { CDN_URL } from "../../../utils/constants.ts";
import { ensureElement } from "../../../utils/utils.ts";
import { Card } from '../Card/Card.ts'

type TCardCatalog = Pick<IProduct, 'image' | 'category'>;
type TCardCatalogActions = {
  onClick?: () => void;
};

export class CardCatalog extends Card<TCardCatalog> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(protected container: HTMLElement, protected actions?: TCardCatalogActions) {
    super(container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    if (this.actions?.onClick) {
      this.container.addEventListener('click', this.actions.onClick);
    }
  }
  //тут вызовем модификатор из Card, который мы там писали
  set categoryOfCard(category: TCategoryNames) {
    const modOfClassCard = Card.getCategoryClassByCategoryName(category);
    this.cardCategory.textContent = category;
    this.cardCategory.className = `card__category ${modOfClassCard}`;
  }
  set image(imgSrc: string) {
    // this.cardImage.src = `${CDN_URL}/${imgSrc}`;
    this.setImage(this.cardImage, CDN_URL + imgSrc);
  }
}