import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private loginSevice: LoginService) { }

  ngOnInit() {
  }

  logout(){
    this.loginSevice.logout();
  }

}
