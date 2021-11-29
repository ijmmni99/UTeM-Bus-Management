import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Lokasi } from 'src/app/models/lokasi.model';
import { Pemandu } from 'src/app/models/pemandu.model';
import { JadualServiceService } from 'src/app/services/jadual-service.service';
import { LokasiServiceService } from 'src/app/services/lokasi-service.service';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { PemanduServiceService } from 'src/app/services/pemandu-service.service';

@Component({
  selector: 'app-daftar-jadual',
  templateUrl: './daftar-jadual.component.html',
  styleUrls: ['./daftar-jadual.component.css']
})
export class DaftarJadualComponent implements OnInit {

  places: Lokasi[];
  drivers: Pemandu[];
  scheduleDate: Date;
  days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  handSet = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        console.log(this.handSet)
        return 1
      }
      console.log(this.handSet)
      return 2
    })
  );

  constructor(public service: JadualServiceService,
    private breakpointObserver: BreakpointObserver,
    private driverService: PemanduServiceService,
    private locationService: LokasiServiceService,
    private notifyService: NotifierServiceService,) { }

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe(list => {
      this.drivers = list.map(item => {
        return {
          ...item.payload.doc.data() as Pemandu
        }
      })
    })

    this.locationService.getLocations().subscribe(list => {
      this.places = list.map(item => {
        return {
          ...item.payload.doc.data() as Lokasi
        }
      })
    })
  }

  OnClear() {
    this.service.form.reset();
  }

  OnSubmit() {
    this.scheduleDate = this.service.form.get('tarikh').value;
    var loIsDate = new Date(this.scheduleDate);
    var dateno = new Date();
    if(loIsDate < dateno)
      return this.notifyService.showError('Tarikh Jadual adalah lebih kecil dari tarikh hari ini.');

    console.log(this.scheduleDate)
    this.service.form.controls['status'].setValue('In Schedule');
    this.service.form.controls['hari'].setValue(this.days[loIsDate.getDay()]);
    if(this.service.form.valid){
      if(!this.service.form.get('id').value) {
        this.service.insertSchedule(this.service.form.value).then(err => {
          this.service.form.reset();
          this.notifyService.showSuccess('Berjaya Mendaftar Jadual');
        }).catch(error => {
          this.notifyService.showError(error);
        });
      }
      else  {
        this.service.updateSchedule(this.service.form.value);
        this.service.form.reset();
        this.notifyService.showSuccess('Berjaya Mengemaskini Jadual');
        //this.OnClose();
      }
      //this.OnClose();
    }
  }

  changeBus() {
    console.log(this.service.form.get('driverID').value)
    var busPlat = this.service.getBusPlateNumber(this.service.form.get('driverID').value)
    this.service.form.controls['plateNumber'].setValue(busPlat);
  }

}
