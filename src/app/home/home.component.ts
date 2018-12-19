import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { SessionService, INologyDetails, INologyDetailsID } from "../services/session.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user;

  nologyDetail:Observable<INologyDetails>;

  constructor(
    private auth: FirebaseAuthService, 
    private sessionService :SessionService) { 
      this.nologyDetail = this.sessionService.nologyDetail;
    }

  logout() {
    this.auth.logout();

  }

  upload(nologyDetail) {
    this.sessionService.upload(nologyDetail);
  }

  update(nologyDetail:INologyDetailsID){
    // console.log(nologyDetail.id)
    this.sessionService.update(nologyDetail);
    
  }

  showInputs(nologyDetail:INologyDetailsID){
    this.sessionService.showInputs(nologyDetail);
  }


  delete(nologyDetail:INologyDetailsID) {
    this.sessionService.delete(nologyDetail)
  }

  ngOnInit() {
  }

}
