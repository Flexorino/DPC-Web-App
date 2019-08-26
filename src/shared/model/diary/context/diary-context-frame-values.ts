/**
 * Class should have at least one property set but the other porperties may be undefined
 */
export class DiaryContextFrameValues {
    // static values
    public lowerBSLimit: number;
    public higherBSLimit: number;
    public hyperglycemiaLimit: number;
    public hypoglycemiaLimit: number;
    
    // 24 values
    public dailyBSGoalValues: Array<number>;

    constructor(public readonly id: string) { }
}