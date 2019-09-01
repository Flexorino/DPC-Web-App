import { DiaryNavigationService } from './../services/diary.navigation.service';
import { Observable } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: "root" })
export class NavUtil {

  constructor(private router: Router, private diaryNav: DiaryNavigationService) { }

  get defaultNavigationRoute() {
    if (!this.diaryNav.currentDiaryId$.getValue) {
      throw new Error("NO DIARY SELECTED!");
    }
    return (['diary', this.diaryNav.currentDiaryId$.getValue(), 'overview']);
  }

  synchroniceFragmentNavigation(steppable: { selectedIndex: number, selectionChange: Observable<StepperSelectionEvent> }) {
    this.router.routerState.root.fragment.subscribe(z => {
      if (z) {
        try {
          if (Number.parseInt(z) !== steppable.selectedIndex) {
            steppable.selectedIndex = Number.parseInt(z);
          }
        } catch (err) {
          steppable.selectedIndex = 0;
        }
      } else {
        steppable.selectedIndex = 0;
      }
    }
    );
    steppable.selectionChange.subscribe((z: StepperSelectionEvent) => {
      this.router.navigate([], { fragment: z.selectedIndex + "" });
    });
  }
}