import { UserReference } from './user-reference';
import { DiaryReference } from './diary-reference';
import { Rights } from './rights/grant-rights';

export class Grant {

    public diaryReference: DiaryReference;
    public userReference: UserReference;
    public rights: Array<Rights>;
}