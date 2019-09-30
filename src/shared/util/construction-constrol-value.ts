export class ConstructionControlValue<T> {
    raw: any;
    constructed: T = null;
    get empty() : boolean{
    //    console.warn("Ccnstructed ist "+JSON.stringify(this.constructed));
        if(!this.constructed){
         //   console.warn("ich gebe wahr zurück");
            return true;
        }
        if(this.constructed instanceof Array && this.constructed.length === 0){
            return true;
        }
        return false;
    }

    constructor(raw?: any, constructed?: T) {
        this.raw = raw;
        this.constructed = constructed;
    }

    static get DEFAULT(): ConstructionControlValue<any> {
        let x = new ConstructionControlValue();
        x.raw = null;
        x.constructed = null;
        return x;
    }
}