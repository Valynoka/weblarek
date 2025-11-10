import { IBuyer, ValidationResult } from "../../types";

export class Buyer {
  payment: "Online" | "Offline" | undefined;
  email: string;
  phone: string;
  address: string;

  constructor() {
    this.payment = undefined;
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  setPayment(payment: "Online" | "Offline"): void {
    this.payment = payment;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  setPhone(phone: string): void {
    this.phone = phone;
  }
  setAddress(address: string): void {
    this.address = address;
  }
  setAllBuyersData(
    payment: "Online" | "Offline",
    email: string,
    phone: string,
    address: string
  ): void {
    this.payment = payment;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
  validateData(): ValidationResult {
    const error: ValidationResult = {};
    if (!this.payment) {
      error.payment = "Не выбран способ оплаты";
    }
    if (!this.email) {
      error.email = "Не введен адрес электронной почты";
    }
    if (!this.phone) {
      error.phone = "Не введен номер телефона";
    }
    if (!this.address) {
      error.address = "Не введен адрес";
    }
    return error;
  }
  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }
  clearBuyerData(): void {
    this.payment = undefined;
    this.email = "";
    this.phone = "";
    this.address = "";
  }
}
