
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { LoginService, LoginInformation } from 'src/shared/services/login.service';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.scss']
})
export class LoginAndRegisterComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login();
  }

  test() {
    //this.loginService.currentUserInformation = new LoginInformation("kekoroni", "kekus");
  }

}
