import {Injectable} from '@angular/core';
import {Seeker} from "../../models/Seeker";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {Employer} from "../../models/Employer";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(protected db: AngularFirestore, protected auth: AuthService) {
  }

  async getSeeker(id: string) {
    return await this.db.collection<Seeker>('Seekers').doc(id).ref.get()
  }

  async createSeeker(uid: string, userdata: Seeker): Promise<boolean> {
    try {
      await this.db.collection("Seekers").doc(uid).set(userdata);
      console.log("Seeker add");
      return true;
    } catch (err) {
      console.error("Error add seeker:", err);
      alert(err);
      return false;
    }
  }

  async createEmployer(uid: string, userdata: Employer): Promise<boolean> {
    try {
      await this.db.collection("Employers").doc(uid).set(userdata);
      console.log("emp add");
      return true;
    } catch (err) {
      console.error("Error add emp:", err);
      alert("err.message");
      return false;
    }
  }
}
