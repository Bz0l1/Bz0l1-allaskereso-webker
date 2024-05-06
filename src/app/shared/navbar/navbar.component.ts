import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router, RouterModule} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, NgIf]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authSubscription = this.auth.currentAuthStatus.subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;
        console.log("Bejelentkezési állapot változott: ", user);

      },
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.auth.logOut().then(() => {
      this.router.navigate(['login']).catch((err) => {
        console.error(':', err);
      });
    });
  }
}
