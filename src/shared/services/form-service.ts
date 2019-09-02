import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class FormService {

    public closeRequest: Observable<void>;
    public submitRequest: Observable<void>;
    public formLeave: Observable<void>;
    private closeRequestSubj: Subject<void> = new Subject();
    private submitRequestSubj: Subject<void> = new Subject();
    private formLeaveSubj: Subject<void> = new Subject();

    constructor() {
        this.closeRequest = this.closeRequestSubj;
        this.submitRequest = this.submitRequestSubj;
        this.formLeave = this.formLeaveSubj;
    }

    public requestSubmit() {
        this.formLeaveSubj.next();
    }

    public requestClose() {
        this.closeRequestSubj.next();
    }

    public notifyLeave() {
        this.formLeaveSubj.next();
    }
}