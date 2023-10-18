import { Component } from '@angular/core';
import { Orders } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  orderItems:Orders[]=[];
  constructor(private orderService:OrdersService)
  {
    this.orderItems = this.orderService.getOrderDetails();
  }

}
