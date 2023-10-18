import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  cartItems:Cart[]=[];
  constructor(private cartService:CartService)
  {
    this.cartItems = this.cartService.getCartItems();
  }

  RemoveFromCart(id:number):void{
    this.cartItems=this.cartService.RemoveCartItem(id);
    
  }

  getTotal():number{
    return this.cartService.GetTotalAmount();
  }

  CheckOut():void{
    this.cartItems=this.cartService.CheckOutItems();
  }
}
