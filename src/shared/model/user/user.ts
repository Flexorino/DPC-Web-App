import { DiaryReference } from './diary-reference';
import { Grant } from './grant';

export class User {
    public name: string;
    public myDiaries: Array<DiaryReference>;
    public grants: Array<Grant>;
} 