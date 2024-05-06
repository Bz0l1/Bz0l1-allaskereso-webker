import { Component } from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {AuthService} from "../../shared/services/auth.service";
import {AppliedJob} from "../../models/AppliedJob";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ads: Array<any> = []
  apps: Array<string> = []

  constructor(protected data: DataService, protected auth: AuthService) { }

  ngOnInit() {
  this.data.getAllJobs(res => this.ads = res)
  this.data.getAllApps(res => {
    this.apps = res;
    console.log(res)
  })
}

  onApplyPressed(itemElement: any) {
  console.log(this.apps)
  let uid = this.auth.currentUser?.uid;
  if (!uid)
    return

  console.log('Add:', itemElement);
  const application: AppliedJob = {
    jobID: itemElement,
    seekerID: this.auth.currentUser?.uid || ''
  };

  this.data.addApp(application).then(success => {
    if (success) {
      console.log('Siker: jelentkezés')
      this.apps.push(itemElement);
    } else {
      console.log('sikertelen: jelentkezés');
    }
  });
}

  onDeapplyPressed(itemElement: any) {
    let uid = this.auth.currentUser?.uid;
    if (!uid)
      return

    console.log('Remove:', itemElement);
    const application: AppliedJob = {
      jobID: itemElement,
      seekerID: this.auth.currentUser?.uid || ''
    };

    this.data.removeApp(application).then(success => {
      if (success) {
        console.log('Siker: jelentkezés törölés')
        this.apps = this.apps.filter(app => app !== itemElement);
      } else {
        console.log('sikertelen: jelentkezés törlés');
      }
    });
  }
}
