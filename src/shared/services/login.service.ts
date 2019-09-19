import { UserService } from './user.service';
import { ConfigurationParameters } from './../../web-api/configuration';
import { Configuration } from 'src/web-api';
import { AuthService } from 'src/app/auth.service';
import { map, tap, flatMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, combineLatest, config, pipe } from 'rxjs';
import { Injectable } from "@angular/core";

export class LoginInformation {
    constructor(public userId: string, public defaultDiary: string) {

    }
}

@Injectable({ providedIn: "root" })
export class LoginService {

    private current: BehaviorSubject<LoginInformation> = new BehaviorSubject(null);
    public loginInformation$: Observable<LoginInformation>;
    public unknownAuthentication: Observable<void>;
    public initialized: Observable<boolean>;
    private intitializedSub = new BehaviorSubject(false);


    private unknownAuthenticationSubject: Subject<void> = new Subject();

    private intit = false;

    constructor(private auth: AuthService, private apiConfig: Configuration, private userService: UserService) {
        auth.localAuthSetup();

        this.unknownAuthentication = this.unknownAuthenticationSubject;

        auth.isAuthenticated$.subscribe(x => {
            if (x) {
                console.log("AUTH");
                auth.getTokenSilently$().pipe(tap(x => apiConfig.accessToken = x), flatMap(x => userService.getSelfInformation())).subscribe(x => {
                    if (!x) {
                        this.unknownAuthenticationSubject.next();
                        if (this.current.getValue()) {
                            this.current.next(null);
                        }
                    } else {
                        this.current.next(new LoginInformation(x.id, x.preferences.defaultDiary));
                    }
                });
            } else {
                this.current.next(null);
            }
        });
        auth.isAuthenticated$.subscribe(x => console.log("AUTH: " + x));

        this.loginInformation$ = this.current.asObservable();
        this.initialized = this.intitializedSub.asObservable();
        this.initialized.subscribe(x => this.intit = true);
        setTimeout(x => this.intitializedSub.next(true), 2000);
        //setTimeout(x => this.current.next(new LoginInformation("asd", "adsa")), 1000);
    }

    public login() {
        this.auth.login("/callback");
    }

    public register(name: string): Observable<void> {
        return this.auth.getTokenSilently$().pipe(flatMap(x =>
            this.userService.register({ username: name, idToken: x })
        ), tap(x => this.current.next(new LoginInformation(x.id, x.preferences.defaultDiary))), map(x => null));
    }

    public get currentUserInformation(): LoginInformation {
        return this.current.getValue();
    }

    public get isLoggedIn(): Observable<boolean> {
        if (!this.intit) {
            return this.initialized.pipe(map(x => this.current.getValue() !== null));
        } else {
            return this.current.pipe(map(x => x !== null));
        }
    }

    public logout(){
        this.auth.logout();
    }


}

