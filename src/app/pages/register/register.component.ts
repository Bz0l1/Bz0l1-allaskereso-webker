import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {Data, Router} from "@angular/router";
import {Seeker} from "../../models/Seeker";
import {Employer} from "../../models/Employer";
import {user} from "@angular/fire/auth";
import {DataService} from "../../shared/services/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  industries: string[] = [
    'Technológia',
    'Informatika',
    'Pénzügyi szolgáltatások',
    'Egészségügy',
    'Oktatás',
    'Építőipar',
    'Vendéglátás',
    'Média',
    'Kiskereskedelem',
    'Mezőgazdaság',
    'Gyártás'
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router, protected db: DataService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
      isEmployer: [false],
      companyName: [''],
      industry: [''],
      address: ['']
    });
  }

  private isEmployer() {
    return this.registerForm.get('isEmployer')?.value
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.auth.signup(this.registerForm.get('email')?.value as string, this.registerForm.get('password')?.value as string)
      .then(async (cred) => {  // Mark the function as async
        if (cred && cred.user) {
          console.log(cred);
          if (!this.isEmployer()) {
            const user: Seeker = {
              id: cred.user.uid as string,
              name: this.registerForm.get('name')?.value as string,
              email: this.registerForm.get('email')?.value as string,
              isSeeker: true
            };

            try {
              let result = await this.db.createSeeker(cred.user.uid, user);
              if (result) {
                alert("Sikeres regisztráció!");
              }
            } catch (error) {
              console.error("Hiba történt a munkakereső létrehozása során.", error);
            }
          } else {
            const user: Employer = {
              id: cred.user.uid as string,
              name: this.registerForm.get('name')?.value as string,
              email: this.registerForm.get('email')?.value as string,
              company: this.registerForm.get('companyName')?.value as string,
              address: this.registerForm.get('address')?.value as string,
              industry: this.registerForm.get('industry')?.value as string,
              description: ""
            };

            try {
              let result = await this.db.createEmployer(cred.user.uid, user);
              if (result) {
                alert("Sikeres regisztráció!");
              }
            } catch (error) {
              console.error("Hiba történt a munkakereső létrehozása során.", error);
            }
          }
        } else {
          console.error("Nem sikerült bejelentkezni, a felhasználói adatok nem érhetők el.");
        }
      }).catch((err: Error) => {
      console.log("Sikertelen", err.message);
    });
  }


}
