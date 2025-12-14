import { IBuyer, TPayment, ValidationResult } from "../../types";
import { IEvents } from "../base/Events";


export class CustomerModel {
  private payment: TPayment = '';
  private email: string = '';
  private phone: string = '' ;
  private address: string = ''; 

  constructor (protected events: IEvents) {}

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit('customer:setPayment');
  }
  setEmail(email: string): void {
    this.email = email;
    this.events.emit('customer:setEmail');
  }
  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit('customer:setPhone');
  }
  setAddress(address: string): void {
    this.address = address;
    this.events.emit('customer:setAddress')
  }
  setAllCustomerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    }
  }
  validateData(): ValidationResult {
    const error: ValidationResult = {};
    if (!this.payment) {
      error.payment = 'Не выбран способ оплаты';
    }
        if (!this.email) {
      error.email = 'Укажите адрес електронной почты';
    }
        if (!this.phone) {
      error.phone = 'Укажите номер телефона';
    }
        if (!this.address) {
      error.address = 'Напишите адрес доставки';
    }
    return error
  } 
  clearBuyerData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  } 
  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    }
  }
}