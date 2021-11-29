import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { LokasiServiceService } from 'src/app/services/lokasi-service.service';
import { SenaraiLokasiComponent } from '../senarai-lokasi/senarai-lokasi.component';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-daftar-lokasi',
  templateUrl: './daftar-lokasi.component.html',
  styleUrls: ['./daftar-lokasi.component.css']
})
export class DaftarLokasiComponent implements OnInit {

  constructor(public service: LokasiServiceService,
    private notifyService: NotifierServiceService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SenaraiLokasiComponent>) {
 }

 ngOnInit(): void {
 }

 OnClear(){
   this.service.form.reset();
 }

 OnSubmit(){
   if(this.service.form.valid)
     if (!this.service.form.get('id').value) {
       this.service.insertLocation(this.service.form.value).then(err => {
         this.service.form.reset();
         this.notifyService.showSuccess('Berjaya Mendaftar Lokasi');
       }).catch(error => {
        this.notifyService.showError(error);
      });
     }
     else {
       this.service.updateLocation(this.service.form.value);
       this.service.form.reset();
       this.notifyService.showSuccess('Berjaya Mengemaskini Lokasi');
       this.OnClose();
     }
     this.OnClose();
 }

 OnClose() {
   this.service.form.reset();
   this.dialogRef.close();
 }

 OpenMap() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(MapsComponent, dialogConfig).backdropClick().subscribe(() => {
    this.service.form.reset();
  });;
 }

}