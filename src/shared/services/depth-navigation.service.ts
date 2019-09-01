import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DepthNavigationService {

    private stack: Array<{ r: string, d: any }> = [];

    public recoverData: any = null;

    constructor(private router: Router) { }

    goDeep(recoveryData?: any) {
        this.stack.push({ r: this.router.routerState.snapshot.url, d: recoveryData });
    }

    back(fallback?: any): Promise<boolean> {
        if (this.stack.length) {
            let pop = this.stack.pop();
            this.recoverData = pop.d ? pop.d : null;
            return this.router.navigateByUrl(pop.r);
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