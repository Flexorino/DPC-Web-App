/**
 * Either a 24 values or a stetic value may be set
 */
export class DiaryContextKEFactors {

    public dialyKeFactors?: Array<number>;
    public staticFactor?: number;

    constructor(public readonly id: string) { }
}