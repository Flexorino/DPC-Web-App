export class ConstructionControlValue<T> {
    raw: any;
    constructed: T;

    constructor(raw?: any, constructed?: T){
        this.raw = raw;
        this.constructed = constructed;
    }

    static get DEFAULT() : ConstructionControlValue<any> {
        let x = new ConstructionControlValue();
        x.raw = null;
        x.constructed = null;
        return x;
    }
}