import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAppsComponent } from './my-apps.component';

const routes: Routes = [{ path: '', component: MyAppsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAppsRoutingModule { }
