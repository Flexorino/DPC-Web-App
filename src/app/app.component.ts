import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { Router } from '@angular/router';
import { LoginService, LoginInformation } from './../shared/services/login.service';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService, private loginService: LoginService, private router: Router){}

  ngOnInit(): void {
    this.auth.localAuthSetup();
    this.loginService.loginInformation$.pipe(skip(1)).subscribe(x => 
      {
        /*
        if(x){
        if(x.defaultDiary){
          this.router.navigateByUrl("/diary/"+x.defaultDiary);
        }
        else {
          this.router.navigateByUrl("/diary-collaboration-settings");
        }
      } else {
        this.router.navigateByUrl("login");
      }
      */
    });
    this.auth.isAuthenticated$.subscribe(x => {
      if(x){
        console.log("auth"+x);
        this.loginService.currentUserInformation = new LoginInformation("kekur","kekus-maximus");
      } else {
        console.log("not auth");
      }
    })
  }
}
