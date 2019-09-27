import { User } from './../../../shared/model/user/user';
import { UserInfoActions } from 'src/app/components/user-info/user-info.actions';
import { LoginService } from 'src/shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private loginService: LoginService, private store: Store<{ user: User }>) { }

  public name: string = "";
  public loading = true;


  ngOnInit() {
    this.store.pipe(select("user")).subscribe((x: User) => this.name = x.name);
    let action = UserInfoActions.OPENED(new CompletableAction(this));
    this.store.dispatch(action);
    action.then(x => this.loading = false);
  }

  logout() {
    this.loginService.logout();
  }

}
