import { AuthService } from 'src/app/auth.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { Injectable } from "@angular/core";

export class LoginInformation {
    constructor(public userId: string, public defaultDiary: string) { }
}

@Injectable({ providedIn: "root" })
export class LoginService {

    private current: BehaviorSubject<LoginInformation> = new BehaviorSubject(null);
    public loginInformation$: Observable<LoginInformation>;

    private initialized$: Subject<void> = new Subject();
    private intit = false;

    constructor(private auth: AuthService) {
        auth.localAuthSetup();
        auth.isAuthenticated$.subscribe(x => {
            if (x) {
                auth.getTokenSilently$().subscribe(x => console.log("TOKEN: "+x));
                setTimeout(() => this.current.next(new LoginInformation("x", "x")));
            } else {
                this.current.next(null);
            }
        });
        auth.isAuthenticated$.subscribe(x => console.log("AUTH: " + x));

        this.loginInformation$ = this.current.asObservable();
        this.initialized$.subscribe(x => this.intit = true);
        setTimeout(x => this.initialized$.next(), 3000);
        setTimeout(x => this.current.next(new LoginInformation("asd", "adsa")), 1000);
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

