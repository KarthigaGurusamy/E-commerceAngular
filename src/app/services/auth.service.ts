import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService:StorageService) {}

  ValidateUser(user: User): boolean {
    let userArr = this.storageService.getUserDetails();
    let isUser = userArr.filter(
      (x: User) => x.email === user.email && x.password === user.password
    );
    if (isUser.length !== 0) {
      this.storageService.setLoggedInUser(user);
      return true;
    } else {
      return false;
    }
  }

  
}
