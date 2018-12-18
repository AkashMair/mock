import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from "@angular/forms"
import { environment } from '../environments/environment';
import { AuthGuardService } from '../app/auth-guard.service'


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RouterModule.forRoot([
 //auth needed
 { path: "home", component: HomeComponent, canActivate: [AuthGuardService]},
      //not needed
      { path: "register", component: RegisterComponent},
      { path: "login", component: LoginComponent},
     

    ]),
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
