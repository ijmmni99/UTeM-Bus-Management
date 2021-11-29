import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule} from '@angular/material/form-field/'
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule} from '@angular/material/table';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

import { DaftarBasComponent } from './components/daftar-bas/daftar-bas.component';
import { SenaraiBasComponent } from './components/senarai-bas/senarai-bas.component';
import { DatarPemanduComponent } from './components/datar-pemandu/datar-pemandu.component';
import { SenaraiPemanduComponent } from './components/senarai-pemandu/senarai-pemandu.component';
import { DaftarJadualComponent } from './components/daftar-jadual/daftar-jadual.component';
import { SenaraiJadualComponent } from './components/senarai-jadual/senarai-jadual.component';
import { DaftarLokasiComponent } from './components/daftar-lokasi/daftar-lokasi.component';
import { SenaraiLokasiComponent } from './components/senarai-lokasi/senarai-lokasi.component';
import { environment } from 'src/environments/environment';
import { BasServiceService } from 'src/app/services/bas-service.service';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PemanduServiceService } from './services/pemandu-service.service';
import { MapsComponent } from './components/maps/maps.component';
import { LokasiServiceService } from './services/lokasi-service.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthenticationService } from "./services/authentication.service";
import { KhidmatPemanduComponent } from './components/khidmat-pemandu/khidmat-pemandu.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { StudentChartComponent } from './charts/student-chart/student-chart.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    DaftarBasComponent,
    SenaraiBasComponent,
    DatarPemanduComponent,
    SenaraiPemanduComponent,
    DaftarJadualComponent,
    SenaraiJadualComponent,
    DaftarLokasiComponent,
    SenaraiLokasiComponent,
    LineChartComponent,
    BarChartComponent,
    MapsComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    KhidmatPemanduComponent,
    ChatRoomComponent,
    StudentChartComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatNativeDateModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatTableExporterModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule,
    ChartsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCtOXS3VCs_4eqvQbMebr_eE0nnfruoBko',
      libraries: ['places']
    })
  ],
  providers: [
    BasServiceService,
    PemanduServiceService,
    AuthenticationService,
    LokasiServiceService,
    DatePipe,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
