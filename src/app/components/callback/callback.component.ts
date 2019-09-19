import { pipe } from 'rxjs';
import { LoginService } from './../../../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.unknownAuthentication.subscribe(x => this.router.navigateByUrl("register"));
    this.loginService.loginInformation$.pipe(filter(x => x != null)).subscribe(x => this.router.navigateByUrl("diary/" + x.defaultDiary));
    this.auth.handleAuthCallback();
  }

}
