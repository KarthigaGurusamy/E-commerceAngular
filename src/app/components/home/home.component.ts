import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Orders } from 'src/app/models/orders';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  products: Product[] = [];
  cartItems:Cart[]=[];
  orderItems:Orders[]=[];

  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private cartService: CartService,
    private router: Router,
    private orderService: OrdersService
  ) {
    this.productService.getLocalProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.storageService.SetProducts(this.products);
        this.storageService.SetCart(this.cartItems);
        this.storageService.SetOrders(this.orderItems);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  AddToCart(id: number,operator:string='+'): void {
    console.log(id);
    if (this.storageService.IsLoggedInUser()) {
      this.cartService.AddToCart(id,operator);
    } else {
      this.router.navigate(['login'], { replaceUrl: true });
    }
  }

  BuyProduct(id: number): void {
    if (this.storageService.IsLoggedInUser()) {
      this.orderService.BuyNow(id);
    } else {
      this.router.navigate(['login'], { replaceUrl: true });
    }
  }

  GetProductCount(id:number):boolean{
    return this.cartService.GetProductCount(id);
  }

  GetProductQuantity(id:number):number{
    return this.cartService.GetProductQuantity(id);
  }
}
