import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Pemandu } from 'src/app/models/pemandu.model';
import { map } from 'rxjs/operators';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { PemanduServiceService } from 'src/app/services/pemandu-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SenaraiPemanduComponent } from '../senarai-pemandu/senarai-pemandu.component';

@Component({
  selector: 'app-datar-pemandu',
  templateUrl: './datar-pemandu.component.html',
  styleUrls: ['./datar-pemandu.component.css']
})
export class DatarPemanduComponent implements OnInit {

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

  constructor(public service: PemanduServiceService,
    private breakpointObserver: BreakpointObserver,
    private notifyService: NotifierServiceService,
    private dialogRef: MatDialogRef<SenaraiPemanduComponent>) { }

  ngOnInit(): void {
  }

  OnClear(){
    this.service.form.reset();
  }

  OnSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('id').value) {
        this.service.insertDriver(this.service.form.value).then(err => {
          this.service.form.reset();
          this.notifyService.showSuccess('Berjaya Mendaftar Pemandu');
         })
         .catch(error => {
          this.notifyService.showError(error);
        });
      }
      else  {
        this.service.updateDriver(this.service.form.value);
        this.service.form.reset();
        this.notifyService.showSuccess('Berjaya Mengemaskini Pemandu');
        this.OnClose();
      }
      this.OnClose();
    }
  }

  OnClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }

}
