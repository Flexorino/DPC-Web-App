import { PageTitleService } from './../../../shared/services/title.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

@Component({
  selector: 'app-base-nav',
  templateUrl: './base-nav.component.html',
  styleUrls: ['./base-nav.component.scss']
})
export class BaseNavComponent {
  public shellTitle : Observable<string>;
  public isHandset: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      tap(result => this.isHandset = result)
      
    );


  constructor(private breakpointObserver: BreakpointObserver, private titleService : PageTitleService) { 
    this.shellTitle = titleService.title;
  }

}
