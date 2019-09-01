import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DepthNavigationService {

    private stack: Array<any> = [];

    constructor(private router: Router) { }

    goDeep() {
        this.stack.push(this.router.routerState.snapshot.url);
    }

    back(fallback?: any): Promise<boolean> {
        if (this.stack.length) {
            return this.router.navigateByUrl(this.stack.pop());
        }
        if (fallback) {
            return this.router.navigate(fallback, { relativeTo: null });
        }
        throw new Error("error");
    }

    reset() {
        this.stack = [];
    }
}