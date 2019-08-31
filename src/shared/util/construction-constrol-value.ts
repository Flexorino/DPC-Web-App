export class ConstructionControlValue<T> {
    raw: any;
    constructed: T;

    static get DEFAULT() : ConstructionControlValue<any> {
        let x = new ConstructionControlValue();
        x.raw = null;
        x.constructed = null;
        return x;
    }
}