import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatChip} from "@angular/material/chips";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    NavbarComponent,
    MatGridList,
    MatGridTile,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatButton,
    MatChip,
    MatTooltip,
    ReactiveFormsModule,
    MatIcon
  ]
})
export class UserProfileModule { }
