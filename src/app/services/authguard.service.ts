import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; //makes you use the canActivate function 
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private afAuth: AngularFireAuth,
              private router:Router) { }

  public canActivate(): Observable<boolean>{
    console.log('BOO');
    return this.afAuth.authState.pipe(
      map( (user) =>{
        
          if (user) return true;
          else 
          {
            this.router.navigate(['/login']);
          return false
      }
          }),
          first(),
        )
    }

}
