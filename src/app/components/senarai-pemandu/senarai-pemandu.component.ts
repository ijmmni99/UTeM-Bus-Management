import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pemandu } from 'src/app/models/pemandu.model';
import { PemanduServiceService } from 'src/app/services/pemandu-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatarPemanduComponent } from '../datar-pemandu/datar-pemandu.component';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-senarai-pemandu',
  templateUrl: './senarai-pemandu.component.html',
  styleUrls: ['./senarai-pemandu.component.css']
})
export class SenaraiPemanduComponent implements OnInit, OnDestroy {

  Drivers: Pemandu[];
  subs: Subscription
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'FirstName', 'PhoneNumber', 'Email', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private driverService: PemanduServiceService,
    private notify: NotifierServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subs = this.driverService.getDrivers().subscribe(list => {
      this.Drivers = list.map(item => {
        return {
          ...item.payload.doc.data() as Pemandu
        } 
      })
      this.listData = new MatTableDataSource(this.Drivers);
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
    this.driverService.form.reset()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DatarPemanduComponent, dialogConfig).backdropClick().subscribe(() => {
      this.driverService.form.reset();
    });
  }

  OnEdit(row) {
    this.driverService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DatarPemanduComponent, dialogConfig).backdropClick().subscribe(() => {
      this.driverService.form.reset();
    });
  }

  OnDelete(driverID) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: "Adakah anda ingin padam pemandu ini?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.driverService.deleteDriver(driverID);
      }
    });
  }

}
