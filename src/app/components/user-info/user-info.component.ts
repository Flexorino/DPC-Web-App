import { User } from './../../../shared/model/user/user';
import { UserInfoActions } from 'src/app/components/user-info/user-info.actions';
import { LoginService } from 'src/shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';
import { Store, select } from '@ngrx/store';
import { NotImplementedService } from 'src/shared/services/not-implemented.service';
import { takeWhile, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private loginService: LoginService, private store: Store<{ user: User }>, private notImplementedService: NotImplementedService) { }

  public name: string = "";
  public loading = true;


  ngOnInit() {
    this.store.pipe(select("user")).subscribe((x: User) => this.name = x.name);
    let action = UserInfoActions.OPENED(new ExtendedAction(this));
    this.store.dispatch(action);
    action.then(x => this.loading = false);
  }

  logout() {
    this.loginService.logout();
  }

  changeUsername() {
    this.notImplementedService.showMessage("Funktionalität zum ändern des Nutzernamens");
  }

  changePassword() {
    this.notImplementedService.showMessage("Funktionalität zum ändern des Passwortes");
  }

}
