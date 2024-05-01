import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatSelect,
    MatOption,
    MatCheckbox
  ]
})
export class RegisterModule { }
