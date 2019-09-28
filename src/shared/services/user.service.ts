
import { Rights } from './../model/user/rights/grant-rights';
import { UserReference } from './../model/user/user-reference';
import { GrantManagementService } from './../../web-api/api/grantManagement.service';
import { UserManagementService } from './../../web-api/api/userManagement.service';
import { Injectable } from "@angular/core";
import { Observable, EMPTY } from 'rxjs';
import { DiaryReference } from '../model/user/diary-reference';
import { map, filter } from 'rxjs/operators';
import { Grant } from '../model/user/grant';

export interface UserInfo {
    /**
     * name of the user
     */
    name?: string;
    /**
     * Die Nutzer-Id
     */
    id?: string;

    preferences?: UserInfoPreferences;
}


export interface UserInfoPreferences { 

    defaultDiary?: string;
}


export interface RegisterInfo {
    username?: string;
    idToken?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private userManService: UserManagementService, private grantService: GrantManagementService) {

    }

    public register(info: RegisterInfo): Observable<UserInfo> {
        return this.userManService.registerUser(info);
    }

    public getMyDiaries(): Observable<Array<DiaryReference>> {
        /*
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
            */
        return EMPTY;
    }

    public getSelfInformation(): Observable<UserInfo> {
        return this.userManService.getSelf().pipe(map(x => x.id === undefined ? null : x));
    }

    public getMyGrants(): Observable<Array<Grant>> {
        return this.grantService.getGrantsForUser().pipe(
            map((x: any) => {
                let grants = [];
                x.grants.forEach(y => {
                    let grant = new Grant();
                    grant.userReference = new UserReference(y.user.name, y.user.id);
                    grant.rights = [Rights.FULL_ACCESS];
                    let diaryRef = new DiaryReference(null,null);
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