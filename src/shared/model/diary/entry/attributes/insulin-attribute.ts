import { Insulin } from '../../insulin';

export enum BaseInsulinIntakeSemantics{
    FOOD_BOLUS, CORRECTION_BOLUS, BASAL
}

export class InsulinAttribute {

    // wird erst initialisiert wenn es gebraucht wird
    public insulin: Insulin;
    public semanticIdentifier: BaseInsulinIntakeSemantics;
    public units: number;
}
