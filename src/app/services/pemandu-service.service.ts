import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pemandu } from 'src/app/models/pemandu.model';

@Injectable({
  providedIn: 'root'
})
export class PemanduServiceService {

  constructor(private firestore: AngularFirestore, private angularAuth: AngularFireAuth) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    authID: new FormControl(''),
    DriverID: new FormControl(null, Validators.required),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    IdentityCard: new FormControl('', Validators.required),
    License: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });

  initializeFormGroup(){
    this.form.setValue({
      id: '',
      authID: '',
      DriverID: null,
      FirstName: '',
      LastName: '',
      IdentityCard: '',
      License: '',
      PhoneNumber: '',
      Email: '',
      Password: ''
    })
  }

  getDrivers(){
    return this.firestore.collection('pemandu').snapshotChanges();
  }

  insertDriver(driver: Pemandu) {
    return this.angularAuth.createUserWithEmailAndPassword(driver.Email, driver.Password).then(_ => {
      driver.id = _.user.uid;
      driver.authID = _.user.uid;
      this.firestore.collection('pemandu').doc(driver.id).set(driver);
    })
  }

  updateDriver(driver: Pemandu) {
    this.firestore.doc('pemandu/' + driver.id).update(driver);
  }

  deleteDriver(DriverID: string) {
    this.firestore.doc('pemandu/' + DriverID).delete();
  }

  populateForm(driver) {
    this.form.setValue(driver);
  }
}
