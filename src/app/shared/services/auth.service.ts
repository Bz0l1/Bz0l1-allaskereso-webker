import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {BehaviorSubject} from 'rxjs';
import firebase from 'firebase/compat/app';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //collectionName: string = "Users";
  currentUser: firebase.User | null = null;
  userData: any;
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();


  constructor(protected auth: AngularFireAuth, protected router: Router, protected db: AngularFirestore) {
  }

  async login(email: string, password: string) {
    try {
      const result = await this.auth.signInWithEmailAndPassword(email, password);
      this.authStatusSub.next(this.currentUser);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async signup(email: string, password: string) {
    //return this.afs.collection<Seeker>(this.collectionName).doc(user.id).set(user)
    let user;
    try {
      user = await this.auth.createUserWithEmailAndPassword(email, password).catch(err => {
        alert(err.message);
      })
    } catch {
    }

    return user
  }

  async logout() {
    await this.auth.signOut();
    await this.router.navigate(['/login'])
  }

  update() {
  }

  read() {
  }

  delete() {
  }
}
