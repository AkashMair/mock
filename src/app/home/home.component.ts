import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { SessionService, INologyDetails } from "../services/session.service";


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

  delete(nologyDetail:INologyDetails) {
    this.sessionService.delete(nologyDetail)
  }

  ngOnInit() {
  }

}
