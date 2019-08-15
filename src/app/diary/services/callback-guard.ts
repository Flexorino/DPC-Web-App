import { ModalCallbackService } from './view-moadl-callback.service';
import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';

@Injectable({providedIn:"root"})
export class CallBackGuard  implements CanDeactivate<any> {

    constructor(private callbackService: ModalCallbackService){}

    canDeactivate(component: any, currentRoute: import("@angular/router").ActivatedRouteSnapshot, currentState: import("@angular/router").RouterStateSnapshot, nextState?: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        this.callbackService.current = currentState.url;
        return true;
    }
}