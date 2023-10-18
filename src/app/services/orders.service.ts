import { Injectable } from '@angular/core';
import { Orders } from '../models/orders';
import { Product } from '../models/product';
import { RandomService } from './random.service';
import { CartService } from './cart.service';
import { Cart } from '../models/cart';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orderItems: Orders[] = [];
  constructor(private randomService:RandomService, private storageService:StorageService) {}

  getOrderDetails(): Orders[] {
    
    let userDetails = JSON.parse(sessionStorage.getItem('loggedinuser')!);

    return JSON.parse(localStorage.getItem('orders')!).filter((item:Orders)=>item.email===userDetails.email) ;
  }

  BuyNow(id: number): void {
    let productsArr = JSON.parse(localStorage.getItem('products')!);
    productsArr = productsArr.find((product: Product) => product.id === id);
    let userDetail = JSON.parse(sessionStorage.getItem('loggedinuser')!);
    let ordersArr = JSON.parse(localStorage.getItem('orders')!);

    ordersArr.push({
      orderId: this.randomService.generateRandomNumber(),
      email: userDetail.email,
      date: new Date().toLocaleDateString(),
      productName: productsArr.title,
      price: productsArr.price,
      quantity:1,
      status: "pending",
    });

    localStorage.setItem('orders',JSON.stringify(ordersArr));
  }
}
