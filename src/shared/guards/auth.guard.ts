import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, merge, timer, race } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {

    constructor(private auth: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoggedIn();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
        return this.isLoggedIn();
    }

    private isLoggedIn(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            race(timer(5000).pipe(map(x => false)), this.auth.isLoggedIn).subscribe(x => {
                if (x) {
                    resolve(true);
                } else {
                    this.router.navigateByUrl("/login");
                }
            })
        });
    }

}