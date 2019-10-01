import { DiaryNavigationService } from './diary.navigation.service';
import { DiariesService } from './../../web-api/api/diaries.service';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

export class SavedSessionData {
    public lastDiary: string;
}

export class SessionService {

    public sessionData$: Observable<SavedSessionData>;
    private current: SavedSessionData = null;
    private currentUser = null;


    constructor(private injector: Injector, private loginService: LoginService) {
        loginService.init();
        this.sessionData$ = loginService.loginInformation$.pipe(
            map(x => {
                if (!x) {
                    return null;
                }
                let store = localStorage.getItem(x.userId);
                if (store) {
                    return JSON.parse(store);
                }
                return null;
            })
        );
        setTimeout(() => {

            let diaryNav = injector.get(DiaryNavigationService);
            loginService.loginInformation$.subscribe(x => {
                if (!x) {
                    this.current = null;
                    this.currentUser = null;
                } else {
                    this.current = JSON.parse(localStorage.getItem(x.userId));
                    this.currentUser = x.userId;
                }
            });
        
            diaryNav.currentDiaryId$.subscribe(x => {
                if (!this.current) {
                    this.current = new SavedSessionData();
                }
                this.current.lastDiary = x;
                localStorage.setItem(this.currentUser, JSON.stringify(this.current));
            });
        }
            , 0);

    }
}