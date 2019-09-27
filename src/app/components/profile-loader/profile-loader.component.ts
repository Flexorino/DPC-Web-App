import { UserManagementService } from './../../../web-api/api/userManagement.service';
import { UserService } from './../../../shared/services/user.service';
import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-loader',
  templateUrl: './profile-loader.component.html',
  styleUrls: ['./profile-loader.component.scss']
})
export class ProfileLoaderComponent implements OnInit {

  constructor(private loginService: LoginService, private userAPI: UserManagementService, private router: Router) { }

  ngOnInit() {
    this.loginService.init();
    this.loginService.unknownAuthentication.subscribe(x => this.router.navigateByUrl("register"));
    this.loginService.loginInformation$.pipe(filter(x => x != null)).subscribe(x => this.router.navigateByUrl("diary/" + x.defaultDiary));
  }

}
