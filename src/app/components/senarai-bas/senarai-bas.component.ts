import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bus } from 'src/app/models/bus.model';
import { BasServiceService } from 'src/app/services/bas-service.service';
import { DaftarBasComponent } from '../daftar-bas/daftar-bas.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-senarai-bas',
  templateUrl: './senarai-bas.component.html',
  styleUrls: ['./senarai-bas.component.css']
})
export class SenaraiBasComponent implements OnInit, OnDestroy {

  listData: MatTableDataSource<any>;
  subs: Subscription
  displayedColumns: string[] = ['id', 'plateNumber', 'capacity', 'DriverName' ,'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private busService: BasServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subs = this.busService.getBusses().subscribe(list => {
      let array = list.map(item => {
        let driverName = this.busService.getDriverName(item.payload.doc.data()['DriverID']);
        return {
          DriverName: driverName,
          ...item.payload.doc.data() as Bus
        }
      });
      console.log('errr keluar jgk')
      this.listData = new MatTableDataSource(array);
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

  OnDelete(basID: string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: "Adakah anda ingin padam bas ini?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.busService.deletebus(basID);
      }
    }); 
  }

  OnCreate() {
    this.busService.form.reset()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DaftarBasComponent, dialogConfig).backdropClick().subscribe(() => {
      this.busService.form.reset();
    });
  }

  OnEdit(row) {
    this.busService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DaftarBasComponent, dialogConfig).backdropClick().subscribe(() => {
      this.busService.form.reset();
    });
  }

}
