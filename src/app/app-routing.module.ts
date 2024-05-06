import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoggedInGuard} from "./shared/guard/logged-in.guard";
import {AuthGuard} from "./shared/guard/auth.guard";
import {RoleGuard} from "./shared/guard/role.guard";
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [LoggedInGuard] },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule), canActivate: [LoggedInGuard] },
  { path: 'profile', loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate: [AuthGuard, RoleGuard], data: { roles: [1, 2] } },
  //{ path: 'notifications', loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsModule), canActivate: [AuthGuard] },
  { path: 'my-offers', loadChildren: () => import('./pages/my-offers/my-offers.module').then(m => m.MyOffersModule), canActivate: [AuthGuard, RoleGuard], data: { roles: [2] } },
  { path: 'my-apps', loadChildren: () => import('./pages/my-apps/my-apps.module').then(m => m.MyAppsModule), canActivate: [AuthGuard, RoleGuard], data: { roles: [1] } },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
