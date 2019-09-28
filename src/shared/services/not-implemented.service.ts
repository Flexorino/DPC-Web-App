import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { NotImplementedComponent, NotImplementedMessage } from 'src/app/components/not-implemented/not-implemented.component';


@Injectable({ providedIn: "root" })
export class NotImplementedService {

    constructor(private dialog: MatDialog) {

    }

    showMessage(message: string) {
        this.dialog.open(NotImplementedComponent, { data: new NotImplementedMessage(message) });
    }

}