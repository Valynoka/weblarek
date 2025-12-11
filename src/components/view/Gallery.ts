import { Component } from "../base/Component";

type TGalleryArr = {
  galleryData: HTMLElement[];
}
//Отрисовываем карточки каталога
export class Gallery extends Component<TGalleryArr> {

  constructor(protected container: HTMLElement) {
    super(container)
  }
  set galleryData(catalogData: HTMLElement[]) {
    this.container.replaceChildren(...catalogData);
  }
}