import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error:string='';
  constructor(private authService:AuthService, private route:Router)
  {

  }

  onSubmit(loginForm:NgForm)
  {
    
    let isUser = this.authService.ValidateUser(loginForm.value);
    if(isUser)
    {
      this.route.navigate([''],{replaceUrl:true});
    }
    else
    {
      this.error="Invalid Credentials!!!"
    }

  }
}
