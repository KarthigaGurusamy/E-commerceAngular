import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private storageService: StorageService, private route: Router, private cartService:CartService) {}

  LogOutUser(): void {
    this.storageService.removeLoggedInUser();
    this.route.navigate(['login'], { replaceUrl: true });
  }

  IsUserLoggedIn(): boolean {
    return this.storageService.IsLoggedInUser();
  }

  getCartCount(): number {
    return this.cartService.getCartCount();
  }
}
