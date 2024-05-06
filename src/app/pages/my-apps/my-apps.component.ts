import { Component, OnInit } from '@angular/core';
import { DataService } from "../../shared/services/data.service";
import { AuthService } from "../../shared/services/auth.service";
import { AppliedJob } from "../../models/AppliedJob";

@Component({
  selector: 'app-my-apps',
  templateUrl: './my-apps.component.html',
  styleUrls: ['./my-apps.component.scss']
})
export class MyAppsComponent implements OnInit {
  ads: Array<any> = [];
  apps: Array<string> = [];

  constructor(protected data: DataService, protected auth: AuthService) {}

  ngOnInit() {
    if (!this.auth.currentUser?.uid) {
      return;
    }

    this.data.getAllApps(res => {
      this.apps = res;
      console.log('Applications:', res);
      this.loadAppliedJobs();
    });
  }

  loadAppliedJobs() {
    this.data.getAllJobs(jobs => {
      this.ads = jobs.filter(job => this.apps.includes(job.id));
    });
  }

  onDeapplyPressed(itemElement: any) {
    console.log('Remove:', itemElement);
    const application: AppliedJob = {
      jobID: itemElement,
      seekerID: this.auth.currentUser?.uid || ''
    };

    this.data.removeApp(application).then(success => {
      if (success) {
        console.log('Siker: jelentkezés törlése');
        this.apps = this.apps.filter(app => app !== itemElement);
        this.loadAppliedJobs();
      } else {
        console.log('Sikertelen: jelentkezés törlése');
      }
    });
  }
}
