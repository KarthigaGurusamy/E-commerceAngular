import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const storageService:StorageService=inject(StorageService);
  const router:Router=inject(Router);

  if(storageService.IsLoggedInUser())
  {
    return true;
  }
  else 
  {
    router.navigate(['login']);
    return false;

  }
};
