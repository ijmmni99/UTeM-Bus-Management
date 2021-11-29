import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { NotifierServiceService } from 'src/app/services/notifier-service.service';
import { LokasiServiceService } from 'src/app/services/lokasi-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DaftarLokasiComponent } from '../daftar-lokasi/daftar-lokasi.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor( private mapsAPILoader: MapsAPILoader,
    private notify: NotifierServiceService,
    public service: LokasiServiceService,
    private dialogRef: MatDialogRef<DaftarLokasiComponent>,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
  
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          this.notify.showError('No results found');
        }
      } else {
        this.notify.showError('Geocoder failed due to: ' + status)
      }
  
    });
  }

  SetLokasi() {
    this.service.form.setValue({
      id: '',
      locationName: '',
      latitude: this.latitude,
      longitude: this.longitude,
    });
    this.dialogRef.close();
  }

}
