import { UserService } from './user.service';
import { ConfigurationParameters } from './../../web-api/configuration';
import { Configuration } from 'src/web-api';
import { AuthService } from 'src/app/auth.service';
import { map, tap, flatMap, catchError, filter, take, skip } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, combineLatest, config, pipe, race, timer as keko } from 'rxjs';
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
    private dirty = false;

    private unknownAuthenticationSubject: Subject<void> = new Subject();
    private initialized$: Subject<void> = new Subject();

    private intit = false;

    constructor(private auth: AuthService, private apiConfig: Configuration, private userService: UserService) {
 
    }

    public login() {
        this.auth.login("/callback");
    }

    public init() {
        if(this.dirty){
            return;
        }
        this.dirty = true;
        console.log("loginService");
        this.auth.localAuthSetup();

        this.unknownAuthentication = this.unknownAuthenticationSubject;

        this.auth.isAuthenticated$.subscribe(x => {
            if (x) {
                console.log("AUTH");
                this.auth.getTokenSilently$().pipe(tap(x => this.apiConfig.accessToken = x), flatMap(x => this.userService.getSelfInformation())).subscribe(x => {
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
        this.auth.isAuthenticated$.subscribe(x => console.log("AUTH: " + x));

        this.loginInformation$ = this.current.asObservable();
        this.initialized = this.intitializedSub.asObservable();
        this.initialized$.subscribe(x => {
            console.log("init");
            this.intit = true;
            this.intitializedSub.next(true)
        });
        let timer : Observable<void> = keko(5000, 1000).pipe(map(x => null));
        let authg : Observable<void> = this.current.pipe(skip(1), map(x => null));
        race(timer, authg).pipe(take(1)).subscribe(() => this.initialized$.next());
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
            return this.initialized$.pipe(map(x => this.current.getValue() !== null));
        } else {
            return this.current.pipe(map(x => x !== null));
        }
    }

    public logout() {
        this.auth.logout();
    }


}

