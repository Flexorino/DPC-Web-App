import { filter } from 'rxjs/operators';
import { LoginService } from './../../../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit {

  username: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  confirm(){
    this.loginService.register(this.username).subscribe();
    this.loginService.loginInformation$.pipe(filter(x => x!=null)).subscribe(x => {
      this.router.navigateByUrl("diary/"+x.userId);
    });
  }

}
