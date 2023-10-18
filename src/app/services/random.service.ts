import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  generateRandomNumber(max=1000):number{
    return Math.floor(Math.random() * max);
  }
}
