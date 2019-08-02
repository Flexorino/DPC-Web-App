import { Insulin } from '../../insulin';
export class InsulinAttribute {

    // wird erst initialisiert wenn es gebraucht wird
    public insulin: Insulin;

    constructor(public insulinId: string, public insulinName: string, public units: number) { }
}
