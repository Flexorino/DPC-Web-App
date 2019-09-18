import { LoginService } from './../../../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.unknownAuthentication.subscribe(x => console.log("unknown"));
    this.auth.handleAuthCallback();
  }

}
