import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoading: boolean = false;

  constructor(public ngAuthService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  signIn(username, password) {
    this.isLoading = true;
    this.ngAuthService.SignIn(username, password).then(err => {
      this.isLoading = false
    })
  }

}
