import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(private registerService:RegisterService, private route:Router)
  {

  }

  onSubmit(registerForm:NgForm)
  {
    this.registerService.AddUsers(registerForm.value);
    this.route.navigate(['login'], {replaceUrl:true});
  }

}
