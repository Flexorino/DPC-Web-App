import { UserManagementService } from './../../../web-api/api/userManagement.service';
import { UserService } from './../../../shared/services/user.service';
import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-loader',
  templateUrl: './profile-loader.component.html',
  styleUrls: ['./profile-loader.component.scss']
})
export class ProfileLoaderComponent implements OnInit {

  constructor(private auth: AuthService, private userAPI: UserManagementService) { }

  ngOnInit() {
    this.auth.getTokenSilently$().subscribe(x => {
      console.log("READY");
     // this.userAPI.tokenToUserMatcherPost({ iDtoken: x }).subscribe(x => console.log(x));
  });
}

}
