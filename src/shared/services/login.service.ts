import { UserService } from './user.service';
import { ConfigurationParameters } from './../../web-api/configuration';
import { Configuration } from 'src/web-api';
import { AuthService } from 'src/app/auth.service';
import { map, tap, flatMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, combineLatest, config } from 'rxjs';
import { Injectable } from "@angular/core";

export class LoginInformation {
    constructor(public userId: string, public defaultDiary: string) {

    }
}

@Injectable({ providedIn: "root" })
export class LoginService {

    private current: BehaviorSubject<LoginInformation> = new BehaviorSubject(null);
    public loginInformation$: Observable<LoginInformation>;

    private initialized$: Subject<void> = new Subject();
    private intit = false;

    constructor(private auth: AuthService, private apiConfig: Configuration, private userService: UserService) {
        auth.localAuthSetup();

        auth.isAuthenticated$.subscribe(x => {
            if (x) {
                console.log("AUTH");
                auth.getTokenSilently$().pipe(tap(x => apiConfig.accessToken = x), flatMap(x => userService.getSelfInformation())).subscribe(x => this.current.next(new LoginInformation(x.id, "kek")), x => console.log("LOGOUT"));
            } else {
                this.current.next(null);
            }
        });
        auth.isAuthenticated$.subscribe(x => console.log("AUTH: " + x));

        this.loginInformation$ = this.current.asObservable();
        this.initialized$.subscribe(x => this.intit = true);
        setTimeout(x => this.initialized$.next(), 3000);
        //setTimeout(x => this.current.next(new LoginInformation("asd", "adsa")), 1000);
    }

    public login() {

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


}

