import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaftarBasComponent } from './components/daftar-bas/daftar-bas.component';
import { DaftarJadualComponent } from './components/daftar-jadual/daftar-jadual.component';
import { DaftarLokasiComponent } from './components/daftar-lokasi/daftar-lokasi.component';
import { DatarPemanduComponent } from './components/datar-pemandu/datar-pemandu.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SenaraiBasComponent } from './components/senarai-bas/senarai-bas.component';
import { SenaraiJadualComponent } from './components/senarai-jadual/senarai-jadual.component';
import { SenaraiLokasiComponent } from './components/senarai-lokasi/senarai-lokasi.component';
import { SenaraiPemanduComponent } from './components/senarai-pemandu/senarai-pemandu.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AuthGuard } from "./auth.guard";
import { KhidmatPemanduComponent } from './components/khidmat-pemandu/khidmat-pemandu.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const routes: Routes = [
  { 
    path: '', redirectTo: '/home/dashboard', pathMatch: 'full'
  },
  { 
    path: 'sign-in', component: SignInComponent 
  },
  { 
    path: 'sign-up', component: SignUpComponent 
  },
  { 
    path: 'forgot-password', component: ForgotPasswordComponent 
  },
  { 
    path: 'email-verification', component: VerifyEmailComponent 
  },
  {
    path: 'home', component: SideNavComponent, canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: HomeComponent},
      {
        path: 'daftar-bas', component: DaftarBasComponent
      },
      {
        path: 'senarai-bas', component: SenaraiBasComponent
      },
      {
        path: 'daftar-pemandu', component: DatarPemanduComponent
      },
      {
        path: 'senarai-pemandu', component: SenaraiPemanduComponent
      },
      {
        path: 'daftar-jadual', component: DaftarJadualComponent
      },
      {
        path: 'senarai-jadual', component: SenaraiJadualComponent
      },
      {
        path: 'daftar-lokasi', component: DaftarLokasiComponent
      },
      {
        path: 'senarai-lokasi', component: SenaraiLokasiComponent
      },
      {
        path: 'khidmat-pemandu', component: KhidmatPemanduComponent,
        children: [
          { path: 'chat-room/:id', component: ChatRoomComponent}
        ]
      },
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
