import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class PageTitleService {
    public title: BehaviorSubject<string> = new BehaviorSubject("");
    private _title: string = "";

    constructor(private ngTitelService: Title) {
        this.title.subscribe(x =>
            ngTitelService.setTitle(x));
    }

    public getTitle() {
        return this.title.getValue();
    }

    public setTitle(title: string) {
        this._title = title;
        this.title.next(this._title);
    }

    public setTitleExtension(extension: string) {
        this.title.next(this._title + " - " + extension)
    }
}