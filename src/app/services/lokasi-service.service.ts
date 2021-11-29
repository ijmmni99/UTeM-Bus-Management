import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lokasi } from '../models/lokasi.model';

@Injectable({
  providedIn: 'root'
})
export class LokasiServiceService {

  constructor(private firestore: AngularFirestore) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    locationName: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      id: '',
      locationName: '',
      latitude: '',
      longitude: '',
    })
  }

  getLocations(){
    return this.firestore.collection('lokasi').snapshotChanges();
  }

  insertLocation(lokasi: Lokasi) {
    lokasi.id = this.firestore.createId();
    return this.firestore.collection('lokasi').doc(lokasi.id).set(lokasi);
  }

  updateLocation(lokasi: Lokasi) {
    return this.firestore.doc('lokasi/' + lokasi.id).update({
      locationName: lokasi.locationName,
      latitude: lokasi.latitude,
      longitude: lokasi.longitude
    });
  }

  deleteLocation(lokasiID: string) {
    this.firestore.doc('lokasi/' + lokasiID).delete();
  }

  populateForm(lokasi) {
    this.form.setValue(lokasi);
  }
}
