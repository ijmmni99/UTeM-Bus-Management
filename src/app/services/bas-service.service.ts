import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bus } from '../models/bus.model';

import * as _ from 'lodash';
import { PemanduServiceService } from './pemandu-service.service';
import { Pemandu } from '../models/pemandu.model';

@Injectable({
  providedIn: 'root'
})
export class BasServiceService {

  drivers = [];

  constructor(private firestore: AngularFirestore, private driverService: PemanduServiceService) { 
    this.driverService.getDrivers().subscribe(list => {
      this.drivers = list.map(item => {
        return {
          ...item.payload.doc.data() as Pemandu
        }
      })
    })
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    plateNumber: new FormControl('', Validators.required),
    capacity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(50)]),
    DriverID: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      id: '',
      plateNumber: '',
      capacity: '',
      DriverID: 0,
    })
  }

  getBusses(){
    return this.firestore.collection('bus').snapshotChanges();
  }

  insertBus(bus: Bus) {
    bus.id = this.firestore.createId();
    return this.firestore.collection('bus').doc(bus.id).set(bus);
  }

  updateBus(bus: Bus) {
    return this.firestore.doc('bus/' + bus.id).update({
      plateNumber: bus.plateNumber,
      capacity: bus.capacity,
      DriverID: bus.DriverID
    });
  }

  deletebus(busID: string) {
    this.firestore.doc('bus/' + busID).delete();
  }

  populateForm(bus) {
    this.form.setValue(_.omit(bus, 'DriverName'));
  }

  getDriverName(id) {
    if(id == "0")
    return "";
    else
    return _.find(this.drivers, (obj) => { return obj.id == id})['FirstName'];
  }
}
