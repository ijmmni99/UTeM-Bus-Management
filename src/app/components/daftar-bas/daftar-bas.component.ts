import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Pemandu } from 'src/app/models/pemandu.model';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { PemanduServiceService } from 'src/app/services/pemandu-service.service';
import { BasServiceService } from '../../services/bas-service.service';
import { SenaraiBasComponent } from '../senarai-bas/senarai-bas.component';

@Component({
  selector: 'app-daftar-bas',
  templateUrl: './daftar-bas.component.html',
  styleUrls: ['./daftar-bas.component.css']
})
export class DaftarBasComponent implements OnInit, OnDestroy {

  subs: Subscription
  
  constructor(public service: BasServiceService,
     private driverService: PemanduServiceService,
     private notifyService: NotifierServiceService,
     private dialogRef: MatDialogRef<SenaraiBasComponent>) {
  }

  drivers: Pemandu[]

  ngOnInit(): void {
    this.subs = this.driverService.getDrivers().subscribe(list => {
      this.drivers = list.map(item => {
        return {
          ...item.payload.doc.data() as Pemandu
        }
      })
    })
  }

  OnClear(){
    this.service.form.reset();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  OnSubmit(){
    if(this.service.form.valid)
      if (!this.service.form.get('id').value) {
        this.service.insertBus(this.service.form.value).then(err => {
          this.service.form.reset();
          this.notifyService.showSuccess('Berjaya Mendaftar Bas');
        }).catch(error => {
          this.notifyService.showError(error);
        });
      }
      else {
        this.service.updateBus(this.service.form.value);
        this.service.form.reset();
        this.notifyService.showSuccess('Berjaya Mengemaskini Bas');
        this.OnClose();
      }
      this.OnClose();
  }

  OnClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }

}
