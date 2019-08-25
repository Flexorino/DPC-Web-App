import { Insulin } from '../../insulin';
export class InsulinAttribute {

    // wird erst initialisiert wenn es gebraucht wird
    public insulin: Insulin;
    public semanticIdentifier: string;
    public units: number;
}
