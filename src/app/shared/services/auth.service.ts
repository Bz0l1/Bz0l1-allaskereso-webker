import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {BehaviorSubject} from 'rxjs';
import firebase from 'firebase/compat/app';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.User | null = null;
  userData: any
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();
  _authLevel: number = 0;

  public set authLevel(level: number) {
    this._authLevel = level;
    localStorage.setItem('authLevel', level.toString());
  }

  public get isSeeker() {
    return this.authLevel === 1;
  }

  public get authLevel() {
    let storage = localStorage.getItem("authLevel");
    if (!storage) return 0;
    this._authLevel = parseInt(storage);
    return this._authLevel;
  }

  constructor(protected auth: AngularFireAuth, protected db: AngularFirestore, protected router: Router) {
    this.authStatusListener();
  }

  authStatusListener(){
    this.auth.onAuthStateChanged((credential)=>{
      if(credential){
        this.authStatusSub.next(credential);
        this.currentUser = credential
        console.log("Logged in")
        this.updateAuthorizationLevel().then(() => {
          console.log("Auth level up")
        }).catch()
      }
      else{
        this.currentUser = null
        this.authStatusSub.next(null);
        this.authLevel = 0;
        console.log("Logged out")
      }
    }).then(() => {
      console.log("Auth status ellenorzes siker")
    }).catch(err => {
      console.error(err)
    })
  }

    async login(email: string, password: string): Promise<void> {
        try {
            await this.auth.signInWithEmailAndPassword(email, password);
            await this.updateAuthorizationLevel();
            await this.router.navigate(["home"]);
            console.log(this.currentUser?.uid)
        } catch (err) {
            console.error("Login failed:", err);
            throw new Error("Hibás felhasználónév vagy jelszó!");
        }
    }


    async updateAuthorizationLevel() {
    let seekerData = await this.db.collection("Seekers").doc(this.currentUser?.uid).ref.get();
    let employerData = await this.db.collection("Employers").doc(this.currentUser?.uid).ref.get();
    if (seekerData.data()) {
      this.userData = seekerData.data()
      this.authLevel = 1;
    }
    else if (employerData.data()) {
      this.userData = employerData.data()
      this.authLevel = 2;
    }
  }

  async signUp(email: string, password: string) {
    try {
      const user = await this.auth.createUserWithEmailAndPassword(email, password);
      if (user) {
        await this.login(email, password);
      }
      return user;
    } catch (err) {
      alert(err);
      return null;
    }
  }


  async logOut(){
    await this.auth.signOut();
    this.authLevel = 0;
    await this.router.navigate(['home'])
  }
}
