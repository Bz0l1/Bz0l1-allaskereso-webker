// src/app/shared/guard/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = next.data['roles'] as Array<number>;
    if (this.authService.authLevel && requiredRoles.includes(this.authService.authLevel)) {
      return true;
    }
    alert('Nincs jogosultságod');
    this.router.navigate(['/home']);
    return false;
  }
}
