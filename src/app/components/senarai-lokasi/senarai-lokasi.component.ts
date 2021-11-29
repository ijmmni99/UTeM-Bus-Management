import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Lokasi } from 'src/app/models/lokasi.model';
import { LokasiServiceService } from 'src/app/services/lokasi-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaftarLokasiComponent } from '../daftar-lokasi/daftar-lokasi.component';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-senarai-lokasi',
  templateUrl: './senarai-lokasi.component.html',
  styleUrls: ['./senarai-lokasi.component.css']
})
export class SenaraiLokasiComponent implements OnInit , OnDestroy{

  Locations: Lokasi[];
  listData: MatTableDataSource<any>;
  subs: Subscription
  displayedColumns: string[] = ['locationName', 'latitude', 'longitude', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private locationService: LokasiServiceService,
    private notify: NotifierServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subs = this.locationService.getLocations().subscribe(list => {
      this.Locations = list.map(item => {
        return {
          ...item.payload.doc.data() as Lokasi
        }
      })
      this.listData = new MatTableDataSource(this.Locations);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  OnSearchClear(){
    this.searchKey= '';
    this.OnSearchKeyup();
  }

  OnSearchKeyup(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  OnCreate() {
    this.locationService.form.reset()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DaftarLokasiComponent, dialogConfig).backdropClick().subscribe(() => {
      this.locationService.form.reset();
    });
  }

  OnEdit(row) {
    this.locationService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DaftarLokasiComponent, dialogConfig).backdropClick().subscribe(() => {
      this.locationService.form.reset();
    });
  }

  OnDelete(locationID) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: "Adakah anda ingin padam lokasi ini?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.locationService.deleteLocation(locationID);
      }
    });
  }

}
