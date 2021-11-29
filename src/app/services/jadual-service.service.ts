import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bus } from '../models/bus.model';
import { Jadual } from '../models/jadual.model';
import { BasServiceService } from './bas-service.service';
import * as _ from 'lodash';
import { LokasiServiceService } from './lokasi-service.service';
import { Lokasi } from '../models/lokasi.model';

@Injectable({
  providedIn: 'root'
})
export class JadualServiceService {

  bus = [];
  locations = []

  constructor(private firestore: AngularFirestore, private busService: BasServiceService, private lokasiService: LokasiServiceService) { 
    
    this.busService.getBusses().subscribe(list => {
      this.bus = list.map(item => {
        return {
          ...item.payload.doc.data() as Bus
        }
      })
    })

    this.lokasiService.getLocations().subscribe(list => {
      this.locations = list.map(item => {
        return {
          ...item.payload.doc.data() as Lokasi
        }
      })
    })
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    anjal: new FormControl('', Validators.required),
    driverID: new FormControl('', Validators.required),
    plateNumber: new FormControl('', Validators.required),
    hari: new FormControl(''),
    tarikh: new FormControl(null, Validators.required),
    lokasiA: new FormControl('', Validators.required),
    lokasiB: new FormControl('', Validators.required),
    lokasiC: new FormControl('', Validators.required),
    timeStart: new FormControl('', Validators.required),
    timeMiddle: new FormControl('', Validators.required),
    timeEnd: new FormControl('', Validators.required),
    lebihMasa: new FormControl(false),
    status: new FormControl(''),
  });

  initializeFormGroup(){
    this.form.setValue({
      id: '',
      anjal: 0,
      driverID: 0,
      plateNumber: '',
      hari: 0,
      tarikh: null,
      lokasiA: 0,
      lokasiB: 0,
      lokasiC: 0,
      timeStart: '',
      timeMiddle: '',
      timeEnd: '',
      lebihMasa: false,
      status: '',
    })
  }

  getSchedule(){
    return this.firestore.collection('jadual').snapshotChanges();
  }

  getScheduleLimit(){
    return this.firestore.collection('jadual', ref => ref.orderBy('tarikh','desc').limit(7)).snapshotChanges();
  }

  insertSchedule(jadual: Jadual) {
    jadual.id = this.firestore.createId();
    return this.firestore.collection('jadual').doc(jadual.id).set(jadual);
  }

  updateSchedule(jadual: Jadual) {
    this.firestore.doc('jadual/' + jadual.id).update(jadual);
  }

  deleteSchedule(jadualID: string) {
    this.firestore.doc('jadual/' + jadualID).delete();
  }

  populateForm(jadual) {
    this.form.setValue(_.omit(jadual, 'DriverName', 'lokasiAname', 'lokasiBname', 'lokasiCname'));
  }

  getBusPlateNumber(id) {
    if(id == "0")
    return "";
    else
    return _.find(this.bus, (obj) => { return obj.DriverID == id})['plateNumber'];
  }

  getLokasi(id) {
    if(id == "0")
    return "";
    else
    return _.find(this.locations, (obj) => { return obj.id == id})['locationName'];
  }
}
