import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PelajarService {

  constructor(private firestore: AngularFirestore, private angularAuth: AngularFireAuth) { }

  getStudents(){
    return this.firestore.collection('pelajar').snapshotChanges();
  }

  getOnBoardStudents(id: string){
    return this.firestore.collection('ScheduleStudentHistory').doc(id).collection('Students').snapshotChanges();
  }
}
