
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { LoginService, LoginInformation } from 'src/shared/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.scss']
})
export class LoginAndRegisterComponent implements OnInit {

  public loggedIn: boolean = false;
  public init: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.isLoggedIn.subscribe(x => this.loggedIn = x);
    this.loginService.initialized.subscribe(x => this.init = x);
  }

  login() {
    this.loginService.login();
  }

  test() {
    //this.loginService.currentUserInformation = new LoginInformation("kekoroni", "kekus");
  }

  logout () {
    this.loginService.logout();
  }

}
