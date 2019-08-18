export class BSUnit {
    constructor(public identifier: string, public factor: number) {

    }
}

export class BSUnits {
    static MG_PER_DL = new BSUnit("mg/dl", 18.02);
    static MMOL_PER_L = new BSUnit("mmol/l", 1);
}