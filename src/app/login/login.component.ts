import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import {FirebaseAuthService } from "../services/firebase-auth.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage="";

  constructor(
    private router: Router,
    private auth: FirebaseAuthService
  ) { }

  login (details: { email: string, password: string}){
    this.auth.login(details.email, details.password)
    .then(()=>{
      this.router.navigate(['/'])

    }

    )
  }

  ngOnInit() {
  }

}
