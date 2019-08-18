export enum Absorption {
    SLOW, MEDIUM, FAST
}

export class Food {

    public absorption?: Absorption;
    public name: string;
    public description?: string;
    public carbsFactor?: number;

    constructor(public readonly id: string) {}
}