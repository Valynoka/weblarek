import { ServerApi } from './components/api/ServerAPI';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { BasketModel } from './components/model/BasketModel';
import { CatalogModel } from './components/model/CatalogModel';
import { CustomerModel } from './components/model/CustomerModel';
import { Basket } from './components/view/Basket';
import { CardBasket } from './components/view/Card/CardBasket';
import { CardCatalog } from './components/view/Card/CardCatalog';
import { CardPreview } from './components/view/Card/CardPreview';
import { ContactsForm } from './components/view/Form/ContactsForm';
import { OrderForm } from './components/view/Form/OrderForm';
import { Gallery } from './components/view/Gallery';
import { Header } from './components/view/Header';
import { Modal } from './components/view/Modal';
import { OrderSuccess } from './components/view/OrderSuccess';
import './scss/styles.scss';
import { IBuyer, IErrorApiResponse, IGetOrderApiResponse, IProduct } from './types';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

//Сервисы API
const api = new Api(API_URL);
const serverApi = new ServerApi(api);
//
const events = new EventEmitter ()
//Модели обратоки
const catalogMod = new CatalogModel(events);
const basketMod = new BasketModel(events);
const customerMod = new CustomerModel(events);
//DOM элементы
const catalogElement = ensureElement<HTMLElement>('.gallery');
const headerElement = ensureElement<HTMLElement>('.header');
const modalElement = ensureElement<HTMLTemplateElement>('#modal-container');//.modal
//Template элементы
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
//Создаем объекты представления View
const headerView = new Header(headerElement, events);
const galleryView = new Gallery(catalogElement);//удалить коммент - данные с сервера приходят
const modalView = new Modal(modalElement);
const basketView = new Basket(cloneTemplate(basketTemplate), events);
const orderFormView = new OrderForm(cloneTemplate<HTMLFormElement>(orderFormTemplate), events);
const contactsFormView = new ContactsForm(cloneTemplate<HTMLFormElement>(contactsFormTemplate), events);
const successTemplateView = new OrderSuccess(cloneTemplate<HTMLElement>(successTemplate), events);

//Отрисовываем элементы шапки сайта - у нас это кол-во товаров в корзине
function renderHeader(): HTMLElement {
  return headerView.render({
    counter: basketMod.getTotalStuffsCount(),
  })
}
events.on('basket:addStuff', () => {
  renderHeader();
});
events.on('basket:clear', () => {
  renderHeader();
});
//Отрисовываем корзину
function renderCardBasket(item: IProduct, index: number): HTMLElement {
  const basketCount = new CardBasket(cloneTemplate(cardBasketTemplate),
    {
      onClick: () => {
        events.emit('cardBasket:dellCard', item);
      }
    }
  );
  return basketCount.render(
    {
      ...item, 
      index: index + 1
    },
  );
}
events.on<IProduct>('cardBasket:dellCard', (item) => {
  basketMod.dellStuff(item)
})
//Отрисовываем итоговоую суммы товаров в корзине
function renderBasket(): HTMLElement {
  const basketData = basketMod.getStuffs().map(renderCardBasket);

  return basketView.render({
    items: basketData,
    totalPrice: basketMod.getTotalStuffsPrice()
  });
}
// function renderBasket() {
//   const stuffs = basketMod.getStuffs();
//   const items = stuffs.map((item, index) => {
//     const card = new CardBasket(cloneTemplate(cardBasketTemplate));
//     card.index = index + 1;
//     return card.render(item);
//   })
//   basketView.items = items;
//   basketView.totalPrice = basketMod.getTotalStuffsPrice();
// }
// events.on('basket:open', () => {
//   modalView.render({
//     content: renderBasket(),
//   });
// })
events.on('basket:open', () => {
  renderBasket();
  modalView.content = basketView.render();
  modalView.open();
})
events.on('basket:dellItem', () => {
  renderBasket(),
  renderHeader()
})
//Отрисывываем карточки товара
function renderCardCatalog(card: IProduct): HTMLElement {
  const cardCatalog = new CardCatalog(
    cloneTemplate(cardCatalogTemplate), {
      onClick: () => {
        events.emit('cardCatalog:selected', card)
      }
    }
  )
  return cardCatalog.render(card);
}
events.on("catalog:setProducts", () => {
  const catalogCards: HTMLElement[] = catalogMod.getProducts().map(renderCardCatalog);
  galleryView.render({galleryData: catalogCards})
})
events.on<IProduct>('cardCatalog:selected', (card) => {
  catalogMod.setSelectedProduct(card)
})
events.on('catalog:setSelectedProduct', () => {
  const selectedCard: IProduct | null = catalogMod.getSelectedProducts();
  if (!selectedCard) return;
  modalView.render({content: renderCardInModalWindow(selectedCard)})
})
//Функция отрисовки каталога
function renderCardInModalWindow(card: IProduct): HTMLElement {
  const cardPreview = new CardPreview(cloneTemplate<HTMLTemplateElement>(cardPreviewTemplate),
  //мы получаем карточки, а это значит, что мы уже можем кликнуть на карточку, чтобы добавить ее в корзину
    {
      onClick: () => {
        if (!basketMod.hasStuff(card.id)) {
          basketMod.addStuff(card);
        } else {
          basketMod.dellStuff(card);
        }
        modalView.close();
      },
    }
  )
  return cardPreview.render({
    ...card,
    inCard: abilityToBuyStuff(card),
    buttonText: updateProductButtonText(card),
  }
  );
}
//Отрисовываем форму заказа и проводим валидцию
function renderOrderForm():  HTMLElement {
  const {payment, address} = customerMod.getData();
  const {payment: paymentError, address: addressError} = customerMod.validateData();
  const error: string = paymentError || addressError || '';
  return orderFormView.render(
    {
      payment,
      address,
      error
    }
  )
}
events.on('basket:checkout', () => {
  modalView.render({
    content: renderOrderForm(),
  });
})
events.on('customer:setPayment', () => {
  renderOrderForm();
})
events.on('customer:setAddress', () => {
  renderOrderForm();
})
events.on<Pick<IBuyer, 'payment'>>('order:formSetPayment', ({payment}) => {
  customerMod.setPayment(payment);
})
events.on<Pick<IBuyer, 'address'>>('order:formSetAddress', ({address}) => {
  customerMod.setAddress(address);
})
//Отрисовываем форму контактов и проводим валидацию полей
function renderContactsForm(): HTMLElement {
  const {phone, email} = customerMod.getData();
  const {phone: phoneError, email: emailError} = customerMod.validateData();
  const error: string = phoneError || emailError || '';
  return contactsFormView.render(
    {
      phone,
      email,
      error
    }
  )
}
events.on('order:formSubmit', () => {
  modalView.render({
    content: renderContactsForm(),
  });
})
events.on<Pick<IBuyer, 'email'>>('contact:formSetEmail', ({email}) => {
  customerMod.setEmail(email)
})
events.on<Pick<IBuyer, 'phone'>>('contact:formSetPhone', ({phone}) => {
  customerMod.setPhone(phone)
})
events.on('customer:setEmail', () => {
  renderContactsForm();
})
events.on('customer:setPhone', () => {
  renderContactsForm();
})

function renderOrderSuccess({total}: IGetOrderApiResponse) {
  return successTemplateView.render({
    total
  });
}
events.on('order:successClickClose', () => {
  modalView.close();
})
events.on('contact:formSubmit', async () => {
  try {
    const formSubResponse = await serverApi.order({
      ...customerMod.getData(),
      total: basketMod.getTotalStuffsPrice(),
      items: basketMod.getStuffs().map(({id}) => id)
    });
    basketMod.clear();
    customerMod.clearBuyerData();
    modalView.render({
      content: renderOrderSuccess(formSubResponse)
    });
  } catch (e: unknown) {
    if (getErrorApiResponse(e)) {
      console.error(e.error);
    } else {
      console.error(e)
    }
  }
});
try {
  const products = await serverApi.getProducts();
  catalogMod.setProducts(products.items);
} catch (e: unknown) {
  if (getErrorApiResponse(e)) {
    console.error(e.error)
  } else {
    console.error(e)
  }
}
//Получаем с сервера карочки товаров
// serverApi
//   .getProducts()
//   .then((products) => {
//     catalogMod.setProducts(products.items);
//   })
//   .catch((error) => {
//     console.error('Ошибка загрузки товаров: ', error)
//   });

//Обновляем кнопку
function updateProductButtonText({id, price}: IProduct): string {
  if (price) {
    return basketMod.hasStuff(id) ? 'Удалить из корзины' : 'В корзину';
  }
  return 'Недоступно';
}
//
function abilityToBuyStuff({price}: IProduct): boolean {
  return !!price;
}
//нашел на https://github.com/microsoft/TypeScript/issues/28131
function getErrorApiResponse(x: unknown): x is IErrorApiResponse {
  return typeof x === 'object' && x !== null && 'error' in x;
}


