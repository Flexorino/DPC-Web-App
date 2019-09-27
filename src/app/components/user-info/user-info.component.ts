import { LoginService } from 'src/shared/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public name: string ="Peter";

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
  }

}
