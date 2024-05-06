import {Injectable} from '@angular/core';
import {Seeker} from "../../models/Seeker";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {Employer} from "../../models/Employer";
import {Offer} from "../../models/Offer";
import {AppliedJob} from "../../models/AppliedJob";
import {Skills} from "../../models/skills";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(protected db: AngularFirestore, protected auth: AuthService) {
  }

  async getSeeker(id: string) {
    return await this.db.collection<Seeker>('Seekers').doc(id).ref.get()
  }

  async getEmployer(id: string) {
    return await this.db.collection<Employer>('Employers').doc(id).ref.get()
  }

  async isSeeker(id: string): Promise<boolean> {
    const seekerDoc = await this.getSeeker(id);

    if (seekerDoc.exists && seekerDoc.data()) {
      const seekerData = seekerDoc.data() as Seeker;
      return seekerData.isSeeker;
    } else {
      const employerDoc = await this.getEmployer(id);
      if (employerDoc.exists && employerDoc.data()) {
        const employerData = employerDoc.data() as Employer;
        return employerData.isSeeker;
      }
    }
    return false;
  }

  async createUser(userdata: Seeker | Employer): Promise<boolean> {
    const uid = userdata.id;
    try {
      if ('isEmployer' in userdata && userdata.isEmployer) {
        await this.db.collection("Employers").doc(uid).set(userdata);
      } else {
        await this.db.collection("Seekers").doc(uid).set(userdata);
      }
      return true;
    } catch (err) {
      console.error(err);
      alert("A felhasználó létrehozása sikertelen. Hiba: " + err);
      return false;
    }
  }

  async createJob(offer: Offer): Promise<boolean> {
    try {
      await this.db.collection("JobOffers").add(offer);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getAllJobs(callback: (value: Array<any>) => void) {
    let allOffers: Array<any> = [];
    let offers = await this.db.collection<Offer>("JobOffers").ref.get();

    const offerPromises = offers.docs.map(async (offer) => {
      let offerData = offer.data();
      let snapshot = await this.getEmployer(offerData.empId);
      return {
        'name': offerData.name,
        'description': offerData.description,
        'company': snapshot.data()?.company,
        'employerAddress': snapshot.data()?.address,
        'id': offer.id,
        'salary': offerData.salary,
      };
    });
    allOffers = await Promise.all(offerPromises);
    callback(allOffers);
  }

  async getAllApps(callback: (value: Array<any>) => void) {
    let uid = this.auth.currentUser?.uid;
    if (!uid) {
      setTimeout(() => this.getAllApps(callback), 100);
      return;
    }

    let applications: Array<string> = [];
    (await this.db.collection("AppliedJobs").ref.where('seekerID', '==', uid).get()).forEach(
      doc => {
        const data = doc.data() as AppliedJob;
        applications.push(data.jobID);
      }
    )
    callback(applications)
  }

  async getAllMyOffers(callback: (value: Array<any>) => void) {
    let uid = this.auth.currentUser?.uid;
    if (!uid) {
      setTimeout(() => this.getAllMyOffers(callback), 100);
      return;
    }

    let offers: Array<any> = [];
    let snapshot = await this.db.collection("JobOffers").ref.where('empId', '==', uid).get();
    for (let doc of snapshot.docs) {
      const offerData = doc.data() as Offer;
      let employerSnapshot = await this.db.collection("Employers").doc(offerData.empId).ref.get();
      if (employerSnapshot.exists) {
        const employerData = employerSnapshot.data() as Employer;
        offers.push({
          id: doc.id,
          name: offerData.name,
          description: offerData.description,
          company: employerData.company,
          employerAddress: employerData.address,
          salary: offerData.salary,
        });
      }
    }
    callback(offers);
  }

  async removeOffer(offerId: string) {
    try {
      const docRef = this.db.collection("JobOffers").doc(offerId);
      await docRef.delete();
      console.log("Siker: törlés");
      return true;
    } catch (err) {
      console.error(err);
      alert(err);
      return false;
    }
  }

  async updateOffer(offer: any): Promise<boolean> {
    try {
      const offerRef = this.db.collection("JobOffers").doc(offer.id);
      await offerRef.update(offer);
      return true;
    } catch (err) {
      console.error('Error updating offer:', err);
      return false;
    }
  }

  async updateName(name: string) {
    try {
      const uid = this.auth.currentUser?.uid;
      if (!uid) {
        return false;
      }
      if (await this.isSeeker(uid)) {
        await this.db.collection("Seekers").doc(uid).update({name: name});
      } else {
        await this.db.collection("Employers").doc(uid).update({name: name});
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async updateCompany(company: string) {
    try {
      const uid = this.auth.currentUser?.uid;
      if (!uid) {
        return false;
      }
      if (await this.isSeeker(uid)) {
        return false;
      } else {
        await this.db.collection("Employers").doc(uid).update({company: company});
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async addApp(application: AppliedJob) {
    const {...object} = application
    await this.db.collection("AppliedJobs").ref.add(object).catch(err => {
      alert(err)
      return false;
    })
    return true;
  }

  async removeApp(application: AppliedJob) {
    const {...object} = application
    await this.db.collection("AppliedJobs").ref.where('jobID', '==', object.jobID).where('seekerID', '==', object.seekerID).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    }).catch(err => {
      alert(err)
      return false;
    })
    return true;
  }

  async addSkill(skill: Skills) {
    const {...object} = skill
    await this.db.collection("Skills").ref.add(object).catch(err => {
      alert(err)
      return false;
    })
    return true;
  }

  async removeSkill(skill: Skills) {
    const {...object} = skill
    await this.db.collection("Skills").ref.where('name', '==', object.name).where('seekerID', '==', object.seekerID).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    }).catch(err => {
      alert(err)
      return false;
    })
    return true;
  }

  async getSkill(callback: (res: Array<Skills>) => void) {
    let uid = this.auth.currentUser?.uid;
    if (!uid) {
      setTimeout(() => this.getSkill(callback), 100);
      return;
    }

    let skills: Array<Skills> = [];
    (await this.db.collection("Skills").ref.where('seekerID', '==', uid).get()).forEach(
      doc => {
        const data = doc.data() as Skills;
        skills.push(data);
      }
    )
    callback(skills)
  }
}
