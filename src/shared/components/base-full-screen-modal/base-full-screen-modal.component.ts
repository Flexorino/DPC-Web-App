import { ModalCallbackService } from './../../../app/diary/services/view-moadl-callback.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-full-screen-modal',
  templateUrl: './base-full-screen-modal.component.html',
  styleUrls: ['./base-full-screen-modal.component.scss']
})
export class BaseFullScreenModalComponent implements OnInit {

  constructor(private callBackService: ModalCallbackService, private router: Router) { }

  ngOnInit() {
  }

  public abort() {
      this.router.navigateByUrl(this.callBackService.current);
  }

}
