import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import {FirebaseAuthService } from "../services/firebase-auth.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage="";

  constructor(
    private router: Router,
    private auth: FirebaseAuthService
  ) { }

  register(details: {email:string, password: string }){

    this.auth.register(details.email, details.password)
      .then(()=> {
        this.router.navigate(['/'])
        console.log("success")})
      // .catch((error: Error)=>{ 
      //   this.errorMessage = error.message;
      //   });
      }
      

  ngOnInit() {
  }

}
