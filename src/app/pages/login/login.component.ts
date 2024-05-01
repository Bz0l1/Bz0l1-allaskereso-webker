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

  constructor(private router: Router, private authService: AuthService) {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      if (email && password) { // Check if not null
        this.authService.login(email, password)
          .then(() => {
            this.router.navigateByUrl('/home').then(success => {
              if(!success) {
                console.log('Sikertelen Home')
              }
              console.log('Sikeres Login és Home');
            })


          })
          .catch(error => {
            console.log("Sikertelen login")

          });
      } else {
        console.error('Email vagy Jelszo null');

      }
    }
  }


  get showErrorMessage() {
    return this.loginForm.invalid && (this.loginForm.dirty || this.loginForm.touched);
  }
}
