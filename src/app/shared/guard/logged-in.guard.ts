import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    let authLevel = localStorage.getItem('authLevel');
    if (!authLevel) {
      return true;
    }

    if (parseInt(authLevel) > 0) {
      alert('Már be vagy jelentkezve.');
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
