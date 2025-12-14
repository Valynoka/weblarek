import { IProduct, TCategoryNames } from "../../../types"
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { categoryMap } from "../../../utils/constants";

type TCardData = Pick<IProduct, 'title' | 'price'>;

export class Card<T> extends Component<TCardData & T>{
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container);
    this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
  }
  set title(title: string) {
    this.cardTitle.textContent = title;  
  };

  set price(price: number | null) {
    this.cardPrice.textContent = price ? `${price} синапсов` : 'Бесценно';
  }

  //Можно, конечно в CardCatalog прописывать сразу модификатор по типу card__category_soft, но показалось, 
  //что этот вариант элегантный
  static getCategoryClassByCategoryName(categoryName: TCategoryNames): string {
    return categoryMap[categoryName];
  }
}