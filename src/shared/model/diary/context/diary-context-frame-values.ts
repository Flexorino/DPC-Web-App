/**
 * Class should have at least one property set but the other porperties may be undefined
 */
export class DiaryContextFrameValues {
    // static values
    public staticBSGoalValue?: number;
    public lowerBSLimit?: number;
    public higherBSLimit?: number;
    public hyperglycemiaLimit?: number;
    public hypoglycemiaLimit?: number;
    // 24 values - for each hour
    public dailyBSGoalValues?: Array<number>;

    constructor(public readonly id: string) { }
}