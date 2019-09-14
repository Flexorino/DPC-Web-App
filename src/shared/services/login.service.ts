import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";

export class LoginInformation {
    constructor(public userId: string) { }
}

@Injectable({ providedIn: "root" })
export class LoginService {

    private current: BehaviorSubject<LoginInformation> = new BehaviorSubject(null);
    public loginInformation$: Observable<LoginInformation>;

    constructor() {
        this.loginInformation$ = this.current.asObservable();
    }

    public set currentUserInformation(n: LoginInformation) {
        this.current.next(n);
    }

    public get currentUserInformation(): LoginInformation {
        return this.current.getValue();
    }

    public get isLoggedIn(): boolean {
        return this.current.getValue() !== null;
    }


}

