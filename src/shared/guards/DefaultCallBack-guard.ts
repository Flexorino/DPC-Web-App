import { ModalCallbackService } from './../../app/diary/services/view-moadl-callback.service';
import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';

@Injectable({providedIn:"root"})
export class DefaultCallBackRouteGuard implements CanActivate {

    constructor(private callbackService: ModalCallbackService){

    }

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return true;
    }

}