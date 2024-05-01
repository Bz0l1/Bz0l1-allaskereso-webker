import {Component} from '@angular/core';
import {Seeker} from "../../models/Seeker";
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule]
})

export class NavbarComponent {
  constructor(protected auth: AuthService) {}
}
