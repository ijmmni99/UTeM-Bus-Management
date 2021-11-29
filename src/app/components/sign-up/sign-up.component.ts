import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isLoading: boolean = false;
  constructor(public ngAuthService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  signOut(username, password) {
    this.isLoading = true;
    this.ngAuthService.SignUp(username, password).then(err => {
      this.isLoading = false;
    })
  }

}
