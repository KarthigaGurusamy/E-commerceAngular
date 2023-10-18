import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private storageService:StorageService, private randomService:RandomService) { }



  AddUsers(user:User){
     let userArr:User[] = this.storageService.getUserDetails();
     userArr.push({id:this.randomService.generateRandomNumber(),email:user.email,password:user.password});
     localStorage.setItem("users",JSON.stringify(userArr));
  }
}
