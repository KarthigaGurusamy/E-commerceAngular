import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Cart } from '../models/cart';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];
  cartItems: Cart[] = [];
  orderItems: Orders[] = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  getLocalProducts(): Observable<Product[]> {
    let prodArr = this.storageService.getProductDetails();
    return new Observable<Product[]>((observer) => {
       if (prodArr.length > 0) {
        observer.next(this.storageService.getProductDetails());
      } 
      
      else {
        this.getProducts().subscribe({
          next: (products: Product[]) => {
            let isChanged =
              prodArr.length !== products.length &&
              prodArr.every(
                (o, i) =>
                  o.id === products[i].id &&
                  o.description === products[i].description &&
                  o.image === products[i].image &&
                  o.price === products[i].price &&
                  o.title === products[i].title
              );

            if (isChanged) {
              return observer.next(products);
            } else {
              return observer.next(this.storageService.getProductDetails());
            }
          },
          complete: () => {},
          error: (error: Error) => {
            console.log('Message:', error.message);
            console.log('Name:', error.name);
          },
        });
      }
    });
  }

  getProductsDetails(): Product[] {
    return this.storageService.getProductDetails();
  }
}
