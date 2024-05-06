import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAppsRoutingModule } from './my-apps-routing.module';
import { MyAppsComponent } from './my-apps.component';
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    MyAppsComponent
  ],
  imports: [
    CommonModule,
    MyAppsRoutingModule,
    NavbarComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatButton
  ]
})
export class MyAppsModule { }
