import {Component} from '@angular/core';
import {Seeker} from "../../models/Seeker";
import {Employer} from "../../models/Employer";
import {Skills} from "../../models/skills";
import {DataService} from "../../shared/services/data.service";
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  showNewExperience: boolean = false;
  showNewEducation: boolean = false;
  showNewLanguageSkills: boolean = false;

  skillForm = new FormGroup({
    type: new FormControl(''),
    name: new FormControl('')
  })

  skills: Array<Skills> = []

  constructor(private _snackBar: MatSnackBar, protected data: DataService, protected auth: AuthService) {
    data.getSkill(res => this.skills = res)
  }

  async onSubmitQualification() {
    let values = this.skillForm.value;
    let uid = this.auth.currentUser?.uid;
    if (!values.type || !values.name || !uid) {
      this.openSnackBar("A mezők kitöltése kötelező", "OK");
      return;
    }
    let newskills: Skills = {
      type: values.type,
      name: values.name,
      seekerID: uid
    };
    await this.data.addSkill(newskills);
    this.skills.push(newskills);
    this.skillForm.reset();
    this.showNewEducation = false;
  }

  deleteSkills(item: Skills) {
    this.data.removeSkill(item).then(() => {
      this.skills = this.skills.filter(skill => skill !== item);
      this.openSnackBar("Képesség törölve", "OK");
    })
  }

  async updateName(newName: string) {
    await this.data.updateName(newName)
    this.openSnackBar("Név módosítva", "OK");

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async updateCompanyName(name: string) {
    await this.data.updateCompany(name);
    this.openSnackBar("Cég módosítva", "OK");
  }
}
