import { Component, NgZone } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MapsAPILoader } from '@agm/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export class Markers {
  id: string;
  plateNumber: string;
  latitude: number;
  longitude: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  makers: Markers[];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Statistik Pelajar', cols: 2, rows: 1 , chart: 'line'},
          { title: 'Statistik Bas', cols: 2, rows: 1 , chart: 'bar'},
          { title: 'Statistik ', cols: 2, rows: 1 , chart: ''},
          { title: 'Jumlah Aktif', cols: 2, rows: 1 , chart: ''}
        ];
      }

      return [
        { title: 'Statistik Pelajar', cols: 2, rows: 1 , chart: 'line'},
        { title: 'Statistik Bas', cols: 1, rows: 1 , chart: 'bar'},
        { title: 'Lokasi Bas Semasa', cols: 1, rows: 2 , chart: 'lokasi'},
        { title: 'Jumlah Aktif', cols: 1, rows: 1 , chart: ''}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private fires: AngularFirestore) {
    this.mapsAPILoader.load().then(() => {
      this.fires.collection('lokasisemasa').snapshotChanges().subscribe(value => {
        this.makers = value.map(item => {
          return {
            ...item.payload.doc.data() as Markers
          }
        });

        console.log(this.makers)
        this.setCurrentLocation();
        this.latitude = 2.305735745500684;
        this.longitude = 102.3170196188994
      })
      ;
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = 2.305735745500684;
        this.longitude = 102.3170196188994;
        this.zoom = 15;
      });
    }
  }

}
