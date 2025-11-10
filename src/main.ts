import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog';
import { ShoppingСard } from './components/Models/ShoppingСard';
import './scss/styles.scss';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { WebLarekApi } from './components/services/WebLarekApi';
import { apiProducts } from './utils/data';

//Создаем новые данные
const catalogModel = new Catalog();
const buyerModel = new Buyer();
const shoppingСardModel = new ShoppingСard();

//Тест Каталога
catalogModel.setProducts(apiProducts.items);
console.log('Список товаров из каталога', catalogModel.getProducts());
const firstCartById = catalogModel.getProducts()[0]?.id;
if(firstCartById) {
  catalogModel.setSelectedProduct(catalogModel.getProductById(firstCartById) || null);
  console.log('Товар, который был выбран:', catalogModel.getSelctedProduts());
}

//Тест Карточки
const firstCard = catalogModel.getProducts()[0];
if (firstCard) {
  shoppingСardModel.addStuff(firstCard);
  console.log('В корзину добавлен товар:', shoppingСardModel.getStuffs());
  console.log('Сума и количество товаров', {total: shoppingСardModel.getPriceStuffs(), count: shoppingСardModel.getCountStuffs()});
  shoppingСardModel.dellStuff(firstCard.id);
  console.log('Количество товаров после удаления:', shoppingСardModel.getStuffs());
}

//Тест Покупателя
buyerModel.setAddress('Address');
buyerModel.setEmail('email');
buyerModel.setPayment('Online');
buyerModel.setPhone('number');
const buyerData = buyerModel.getBuyerData();
console.log('Адрес:',buyerData.address);
console.log('Электронная почта:',buyerData.email);
console.log('Способ оплаты:',buyerData.payment);
console.log('Номер телефона:',buyerData.phone);

//Запрос каталога с сервера
const api = new Api(API_URL);
const service = new WebLarekApi(api);

service
  .getProducts()
  .then((stuffs) => {
      catalogModel.setProducts(stuffs);
      console.log('Каталог с сервера получен', catalogModel.getProducts())
  })
  .catch((e) => console.log('Ошибка, каталог получен не был:', e));