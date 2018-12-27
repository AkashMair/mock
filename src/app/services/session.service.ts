import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseAuthService } from'./firebase-auth.service';

export interface INologyDetails {
  date: string;
  title: string;
  rating: number;
  description: string;
  userID: string;
  hideEdit: boolean
}

export interface INologyDetailsID extends INologyDetails{ id:string }

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user;

  // nologyDetailsCollection: AngularFirestoreCollection<INologyDetails>;
  // nologyDetail:Observable<INologyDetails>;

  constructor(private afs:AngularFirestore,
              private fbAuth:FirebaseAuthService) {
    //  this.user = this.fbAuth.user;

    // this.nologyDetailsCollection = this.afs.collection('nologySession', (ref) => {
    //   return ref.where('userID', '==', this.user.uid)
    //   .orderBy('date', 'desc')});
    // this.nologyDetail = this.nologyDetailsCollection.snapshotChanges()
    // .pipe(map(this.includeCollectionID));

   }

  get nologyDetailsCollection() {
   return this.afs.collection('nologySession', (ref) => {
      return ref.where('userID', '==', this.fbAuth.user.uid)
      .orderBy('date', 'desc')});
   }


   get nologyDetail() {
   return this.nologyDetailsCollection.snapshotChanges()
    .pipe(map(this.includeCollectionID));
   }


includeCollectionID(docChangeAction){
     return docChangeAction.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data};
     });
   }

  get(id:string) {
    return this.nologyDetailsCollection.doc(id).get()
    .pipe(map(
      (payload) => {
        return {id:id, ...payload.data()} as INologyDetailsID;
    }
    ));
  }

upload(nologyDetail:INologyDetails){
  return this.nologyDetailsCollection.add({
    userID: this.user.uid,...nologyDetail, hideEdit: true
  })
}

update(nologyDetail:INologyDetailsID){
  console.log(nologyDetail)
  return this.nologyDetailsCollection.doc(nologyDetail.id).update({
    date: nologyDetail.date,
    title: nologyDetail.title,
    rating: nologyDetail.rating,
    description: nologyDetail.description,
    hideEdit: true
  })
}

showInputs(nologyDetail:INologyDetailsID){
  return this.nologyDetailsCollection.doc(nologyDetail.id).update({
    hideEdit:false
  })

}

delete(nologyDetail:INologyDetailsID){
  return this.nologyDetailsCollection.doc(nologyDetail.id).delete()
}
  }
