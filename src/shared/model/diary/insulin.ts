export enum InsulinEffect {
    SLOW, MEDIUM, FAST
}

export class Insulin {
    public name: string; 
    public description?: string; 
    public insulinEffect?: InsulinEffect;

    constructor(public readonly id: string) { }
}