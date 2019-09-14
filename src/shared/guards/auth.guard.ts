import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

    constructor(private auth: LoginService, private router: Router) { }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
        if (!this.auth.isLoggedIn) {
            this.router.navigateByUrl("/login");
        }
        return true;
    }

}