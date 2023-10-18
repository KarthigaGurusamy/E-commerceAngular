import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(private storageServie:StorageService,private route:Router){}
  
  ngOnInit(): void {
    this.storageServie.getUsers();
  }

  // IsValidRoute():boolean{
  //   let paths:string[]=['login','register','**'];
  //   return paths.some((path)=>this.route.isActive(path,true));
  // }

  LoggedInUser():boolean{
    return this.storageServie.IsLoggedInUser();
  }
  
}
