import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Jadual } from 'src/app/models/jadual.model';
import { BasServiceService } from 'src/app/services/bas-service.service';
import { JadualServiceService } from 'src/app/services/jadual-service.service';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { DaftarJadualComponent } from '../daftar-jadual/daftar-jadual.component';
import { DatePipe } from '@angular/common'
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-senarai-jadual',
  templateUrl: './senarai-jadual.component.html',
  styleUrls: ['./senarai-jadual.component.css']
})
export class SenaraiJadualComponent implements OnInit, OnDestroy {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  jaduals: Jadual[];
  subs: Subscription;
  listData: MatTableDataSource<any>;
  listHistory: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'DriverName', 'tarikh', 'lokasiAname', 'lokasiBname', 'lokasiCname','timeStart', 'status', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  searchKey2: string;

  constructor(private jadualService: JadualServiceService,
    private notify: NotifierServiceService,
    private busService: BasServiceService,
    public datepipe: DatePipe,
    private dialog: MatDialog) { 
      
    }

  ngOnInit(): void {
    this.subs = this.jadualService.getSchedule().subscribe(list => {
      let array = list.map(item => {
        let driverName = this.busService.getDriverName(item.payload.doc.data()['driverID']);
        let lokasiA = this.jadualService.getLokasi(item.payload.doc.data()['lokasiA']);
        let lokasiB = this.jadualService.getLokasi(item.payload.doc.data()['lokasiB']);
        let lokasiC = this.jadualService.getLokasi(item.payload.doc.data()['lokasiC']);
        return {
          DriverName: driverName,
          lokasiAname: lokasiA,
          lokasiBname: lokasiB,
          lokasiCname: lokasiC,
          ...item.payload.doc.data() as Jadual
        } 
      })
      array =  array.sort(function (a, b) {
        if (a.tarikh > b.tarikh) return -1;
        if (a.tarikh < b.tarikh) return 1;
        return 0;
      });

      this.listData = new MatTableDataSource(array.filter(s => s.status != "Finish"));
      let filterArray = array.filter(s => s.status == "Finish");

      this.listHistory = new MatTableDataSource(filterArray)

      this.listHistory.filterPredicate = (data, filter: string) => {
        if(this.range.value['start'] && this.range.value['end']){
          let first = new Date(this.range.value['start']);
          let second = new Date(this.range.value['end']);
          return new Date(data['tarikh']) > new Date(this.datepipe.transform(first, 'yyyy-MM-dd')) && new Date(data['tarikh']) < new Date(this.datepipe.transform(second, 'yyyy-MM-dd'));
        }
        else if(this.searchKey2){
          return data['DriverName'].toString().toLowerCase().includes(filter) || 
          data['lokasiAname'].toString().toLowerCase().includes(filter) ||
          data['lokasiBname'].toString().toLowerCase().includes(filter) ||
          data['lokasiCname'].toString().toLowerCase().includes(filter)
        }
        else
          return true;
      }
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

  OnSearchClear2(){
    this.searchKey2= '';
    this.OnSearchKeyup2();
  }

  OnSearchKeyup2(){
    this.listHistory.filter = this.searchKey2.trim().toLowerCase();
  }

  OnCreate() {
    this.jadualService.form.reset()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DaftarJadualComponent, dialogConfig).backdropClick().subscribe(() => {
      this.jadualService.form.reset();
    });
  }

  OnEdit(row) {
    this.jadualService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'matDialogPanel'
    this.dialog.open(DaftarJadualComponent, dialogConfig).backdropClick().subscribe(() => {
      this.jadualService.form.reset();
    });
  }

  OnDelete(driverID) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: "Adakah anda ingin padam jadual ini?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.jadualService.deleteSchedule(driverID);
      }
    });
  }

  onDate() {
    this.listHistory.filter = ''+Math.random;
  }

  ClearDate() {
    this.range.reset();
    this.listHistory.filter = ''+Math.random;
  }

}
