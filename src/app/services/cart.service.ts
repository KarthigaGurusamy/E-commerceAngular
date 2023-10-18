import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { RandomService } from './random.service';
import { StorageService } from './storage.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Cart[] = [];
  constructor(
    private randomService: RandomService,
    private storageService: StorageService
  ) {}

  getCartItems(): Cart[] {
    
    let userDetails = JSON.parse(sessionStorage.getItem('loggedinuser')!);

    return JSON.parse(localStorage.getItem('cart')!).filter(
      (item: Cart) => item.email === userDetails.email
    );
  }

  AddToCart(id: number): void {
    let productsArr = JSON.parse(localStorage.getItem('products')!);
    let userDetails = JSON.parse(sessionStorage.getItem('loggedinuser')!);
    let cartArr = JSON.parse(localStorage.getItem('cart')!);
    productsArr = productsArr.find((item: Product) => item.id === id);
    if (productsArr) {
      if (
        cartArr.find(
          (item: Cart) =>
            item.productId === productsArr.id &&
            item.email === userDetails.email
        )
      ) {
        for (let item of cartArr) {
          if (item.productId === id && item.email === userDetails.email) {
            item.quantity += 1;
            item.price += productsArr.price;
          }
        }
      } else {
        cartArr.push({
          id: this.randomService.generateRandomNumber(),
          productId: id,
          email: userDetails.email,
          title: productsArr.title,
          quantity: 1,
          price: productsArr.price,
        });
      }
    }

    localStorage.setItem('cart', JSON.stringify(cartArr));
    // console.log(this.cartItems);
  }

  getCartCount(): number {
    let user = JSON.parse(sessionStorage.getItem('loggedinuser')!);
    let cartArr = JSON.parse(localStorage.getItem('cart')!).filter(
      (item: Cart) => item.email === user.email
    );
    if (cartArr) {
      let quantitySum: number;
      quantitySum = cartArr.reduce((a: number, c: Cart) => {
        if (c.email === user.email) {
          a += c.quantity;
        }

        return a;
      }, 0);
      return quantitySum;
    } else {
      return 0;
    }
  }

  RemoveCartItem(id: number): Cart[] {
    let user = JSON.parse(sessionStorage.getItem('loggedinuser')!);

    let cartArr = JSON.parse(localStorage.getItem('cart')!);
    cartArr = cartArr.filter((item: Cart) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartArr));
    return JSON.parse(localStorage.getItem('cart')!).filter(
      (item: Cart) => item.email === user.email
    );
  }

  GetTotalAmount(): number {
    let user = JSON.parse(sessionStorage.getItem('loggedinuser')!);
    let cartArr = JSON.parse(localStorage.getItem('cart')!).filter(
      (item: Cart) => item.email === user.email
    );
    if (cartArr) {
      let totalAmount: number;
      totalAmount = cartArr.reduce((a: number, c: Cart) => {
        if (c.email === user.email) {
          a += c.price;
        }
        return a;
      }, 0);

      return totalAmount;
    } else {
      return 0;
    }
  }

  CheckOutItems(): Cart[] {
    let cartArr = JSON.parse(localStorage.getItem('cart')!);
    let ordersArr = JSON.parse(localStorage.getItem('orders')!);
    let user = JSON.parse(sessionStorage.getItem('loggedinuser')!);

    for (let item of cartArr) {
      if (item.email === user.email) {
        ordersArr.push({
          orderId: this.randomService.generateRandomNumber(),
          email: user.email,
          date: new Date().toLocaleDateString(),
          productName: item.title,
          price: item.price,
          quantity:item.quantity,
          status: 'pending',
        });
      }
    }

    cartArr=cartArr.filter((item:Cart)=>item.email!==user.email);
    localStorage.setItem('cart',JSON.stringify(cartArr));
    localStorage.setItem('orders',JSON.stringify(ordersArr));
    return []
  }
  
}
