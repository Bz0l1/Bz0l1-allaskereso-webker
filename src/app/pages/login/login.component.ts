import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      if (email === null || password === null) {
        alert('Email és jelszó megadása kötelező!');
        return;
      }

      try {
        await this.authService.login(email, password);
        this.router.navigate(["home"]);
      } catch (err) {
        alert("Hibás felhasználónév vagy jelszó!");
        this.loginForm.reset();
      }
    } else {
      alert('Töltse ki helyesen a formot!');
    }
  }

  get showErrorMessage() {
    return this.errorMessage || (this.loginForm.invalid && (this.loginForm.dirty || this.loginForm.touched));
  }
}
