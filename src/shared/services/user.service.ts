import { Rights } from './../model/user/rights/grant-rights';
import { UserReference } from './../model/user/user-reference';
import { ListedGrantAnswer } from './../../web-api/model/listedGrantAnswer';
import { GrantManagementService } from './../../web-api/api/grantManagement.service';
import { UserManagementService } from './../../web-api/api/userManagement.service';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DiaryReference } from '../model/user/diary-reference';
import { map } from 'rxjs/operators';
import { Grant } from '../model/user/grant';

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

    public getMyGrants(): Observable<Array<Grant>>{
        return this.grantService.getMyGrantsThatWereGivenToMe().pipe(
            map( (x : ListedGrantAnswer) => {
                let grants = [];
                x.grants.forEach(y => {
                    let grant = new Grant();
                    grant.userReference = new UserReference(y.user.name,y.user.id);
                    grant.rights = [Rights.FULL_ACCESS];
                    let diaryRef = new DiaryReference();
                    diaryRef.diaryId = y.diaryReference.diaryId;
                    diaryRef.diaryName = y.diaryReference.diaryName;
                    grant.diaryReference = diaryRef;
                    grants.push(grant);
                });
                return grants;
            })
        );
    }
}