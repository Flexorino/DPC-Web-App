import { DiaryNavigationService } from './../services/diary.navigation.service';
import { Injectable } from "@angular/core";
import { CanActivateChild, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class CanActivateDiaryViewGuard implements CanActivateChild {
    constructor(private selectedDiaryService: DiaryNavigationService, private router: Router) { }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // TODO mache hier bessere Überprüfungen - z.B., ob Tagebuch mit der Id überhaupt existiert
        if (!route.parent.paramMap.get('diary-id')) {
            this.router.navigate(['/diary-collaboration-settings']);
            return false;
        } else {
            this.selectedDiaryService.setCurrentDiary(route.parent.paramMap.get('diary-id'));
            return true;
        }
    }
}
