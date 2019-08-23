import { DiaryContextKEFactors } from './diary-context-KE-factors';
import { DiaryContextFrameValues } from './diary-context-frame-values';
import { DiaryCorrectionFactors } from './diary-correction-factors';

export class DiaryContext {

    public frameValue?: DiaryContextFrameValues;
    public keFactor?: DiaryContextKEFactors;
    public correctionFactors?: DiaryCorrectionFactors;

    // timestamp
    public validFrom: number;

    constructor(public readonly id: string) { }
}