import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router"



@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {


  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  get user(){
    return this.afAuth.auth.currentUser;
  }

  register(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email, password){
   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.afAuth.auth.signOut()
    .then(() => {
      this.router.navigate(['login'])
    })
    .catch((error:Error)=> {
      console.log(error);
      throw error
    })
  };

}
