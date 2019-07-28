import { PageTitleService } from './../services/title.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: "root" })
export class PageTitleResolver implements Resolve<any> {

    constructor(private titleService: PageTitleService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.titleService.setTitle(route.data["title"]);
        return "";
    }

}