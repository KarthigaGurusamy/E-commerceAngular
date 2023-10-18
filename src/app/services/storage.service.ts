import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  users: User[] = [
    { id: 1, email: 'karthiga@gmail.com', password: 'karthiga' },
  ];
  constructor() {}

  getUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getUserDetails(): User[] {
    return JSON.parse(localStorage.getItem('users')!);
  }

  setLoggedInUser(user: User): void {
    sessionStorage.setItem('loggedinuser', JSON.stringify(user));
  }

  removeLoggedInUser(): void {
    sessionStorage.removeItem('loggedinuser');
  }

  IsLoggedInUser(): boolean {
    let isUser = JSON.parse(sessionStorage.getItem('loggedinuser')!);
    if (isUser) {
      return true;
    } else {
      return false;
    }
  }

  SetProducts(products: Product[]): void {
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }

  SetCart(cart: Cart[]): void {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  SetOrders(order:Orders[]):void{
    if (!localStorage.getItem('orders')) {
      localStorage.setItem('orders', JSON.stringify(order));
    }
  }

  getProductDetails():Product[]{
    if(JSON.parse(localStorage.getItem('products')!))
    {
      return JSON.parse(localStorage.getItem('products')!);
    }
    else 
    {
      return [];
    }
    
  }
}
