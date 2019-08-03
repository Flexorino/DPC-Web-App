import { PageTitleService } from './../../../shared/services/title.service';
import { DiaryNavActions } from './diary-nav.actions';
import { AddEntryComponent } from './../components/add-entry/add-entry.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-diary-nav',
  templateUrl: './diary-nav.component.html',
  styleUrls: ['./diary-nav.component.scss']
})
export class DiaryNavComponent implements OnInit {

  constructor(public dialog: MatDialog, private store: Store<any>, private titelServie: PageTitleService, private router: Router) { }

  private currentSelectedDiaryName = "";

  ngOnInit() {
    this.store.dispatch(DiaryNavActions.OPEN(new CompletableAction(this)));
    this.store.pipe(select('diary')).pipe(select('name')).subscribe(
      x => {
        if (x) {
          this.titelServie.setTitle(this.titelServie.getTitle() + " - " + x);
          this.currentSelectedDiaryName = x;
        }
      }
    );
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        if(this.currentSelectedDiaryName) {
        this.titelServie.setTitle(this.titelServie.getTitle() + " - " + this.currentSelectedDiaryName);
        }
      }
    });
  }

  public openAddEntryDialog() {
    this.dialog.open(AddEntryComponent, { panelClass: 'full_screen_dialog' })
  }
}
