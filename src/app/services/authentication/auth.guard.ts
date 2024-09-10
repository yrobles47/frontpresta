import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService); 
  const router = inject(Router); 
  if(loginService.isLoggednIn()) {
    return true;
  }
  return router.createUrlTree(['/authentication/login']);
  
};
