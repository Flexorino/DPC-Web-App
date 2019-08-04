import { GrantManagementService } from './../../web-api/api/grantManagement.service';
import { UserManagementService } from './../../web-api/api/userManagement.service';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DiaryReference } from '../model/user/diary-reference';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private userManService: UserManagementService, private grantService: GrantManagementService) {

    }

    public getMyDiaries() : Observable<Array<DiaryReference>>{
        return this.userManService.getUserDiaries().pipe(map(x => 
            {
                let references = [];
                x.references.forEach(y => {
                    let reference = new DiaryReference();
                    reference.diaryId = y.diaryId;
                    reference.diaryName = y.diaryName;
                    references.push(reference);
                });
                return references;
            }
            ))
    }
}