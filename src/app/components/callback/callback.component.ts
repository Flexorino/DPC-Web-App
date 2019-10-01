import { DiaryNavigationService } from './../../../shared/services/diary.navigation.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { LoginService } from 'src/shared/services/login.service';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  sub1: Subscription;
  sub2: Subscription;

  constructor(private auth: AuthService, private loginService: LoginService, private router: Router, private diaryNavService: DiaryNavigationService) { }

  ngOnInit() {
    this.auth.handleAuthCallback().subscribe(x => {
      console.log("CCallback");
      this.loginService.init();
      this.sub1 = this.loginService.unknownAuthentication.subscribe(x => {
        this.clear();
        this.router.navigateByUrl("register");
      });
      this.sub2 = this.loginService.loginInformation$.pipe(filter(x => x != null)).subscribe(x => {
        this.clear();
        if (x.defaultDiary) {
          setTimeout(() => this.router.navigateByUrl("diary/" + x.defaultDiary), 50);
        } else {
          this.router.navigateByUrl("diary-collaboration-settings");
        }
      }
      );
    });
  }

  clear() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
