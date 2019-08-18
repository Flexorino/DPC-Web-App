import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class FullScreenModalCloser{

    public closeSubject : Subject<void> = new Subject();

    public close(){
        this.closeSubject.next();
    }
}