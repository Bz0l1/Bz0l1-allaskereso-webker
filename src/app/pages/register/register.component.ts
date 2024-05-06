import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
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

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private db: DataService) {}

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
        }, { validator: this.passwordMatchValidator() });

        this.registerForm.get('isEmployer')?.valueChanges.subscribe(isEmployer => {
            if (isEmployer) {
                this.registerForm.get('companyName')!.setValidators([Validators.required]);
                this.registerForm.get('industry')!.setValidators([Validators.required]);
                this.registerForm.get('address')!.setValidators([Validators.required]);
            } else {
                this.registerForm.get('companyName')!.clearValidators();
                this.registerForm.get('industry')!.clearValidators();
                this.registerForm.get('address')!.clearValidators();
            }
            this.registerForm.get('companyName')!.updateValueAndValidity();
            this.registerForm.get('industry')!.updateValueAndValidity();
            this.registerForm.get('address')!.updateValueAndValidity();
        });
    }

    private passwordMatchValidator(): ValidatorFn {
        return (group: AbstractControl): {[key: string]: any} | null => {
            let pass = group.get('password')?.value;
            let confirmPass = group.get('passwordConfirm')?.value;
            return pass === confirmPass ? null : { notSame: true };
        };
    }

    async onSubmit() {
        if (this.registerForm.valid) {
            const { email, password, name, isEmployer, companyName, industry, address } = this.registerForm.value;
            try {
                const cred = await this.authService.signUp(email, password);
                if (!cred || !cred.user) {
                    alert("Regisztráció sikertelen, a felhasználói adatok nem érhetők el.");
                    return;
                }
                const user = isEmployer ? {
                    id: cred.user.uid,
                    name,
                    email,
                    company: companyName,
                    industry,
                    address,
                    description: "",
                    isEmployer: true,
                    isSeeker: false
                } : {
                    id: cred.user.uid,
                    name,
                    email,
                    isEmployer: false,
                    isSeeker: true
                };

                console.log("Registering user: ", user);

                const success = await this.db.createUser(user);
                if (success) {
                    //alert("Sikeres regisztráció!");
                    await this.authService.login(email, password)
                    await this.router.navigate(['/home']);
                } else {
                    alert("A felhasználó létrehozása sikertelen.");
                }
            } catch (err) {
                console.error("sikertelen: ", err);
                alert("Regisztráció sikertelen, próbálja újra.");
            }
        } else {
            alert("töltsd ki helyesen a formot!");
        }
    }

}
