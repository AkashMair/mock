import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface INologyDetails {
  sessionDate: Date;
  sessionTitle: string;
  sessionRating: number;
  sessionReflection: string;
}

export interface INologyDetailsID extends INologyDetails{ id:string; }

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  nologyDetailsCollection: AngularFirestoreCollection<INologyDetails>;
  nologyDetail:Observable<INologyDetails>;

  constructor(private afs:AngularFirestore) {
    this.nologyDetailsCollection = this.afs.collection('nologySession');
    this.nologyDetail = this.nologyDetailsCollection.snapshotChanges()
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
  return this.nologyDetailsCollection.add(nologyDetail)
}

delete(nologyDetail:INologyDetailsID){
  return this.nologyDetailsCollection.doc(nologyDetail.id).delete()
}
  }
