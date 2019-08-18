import { select } from '@ngrx/store';
import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({selector: '[LOADING]'})
export class LoadingDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
            
        }
}