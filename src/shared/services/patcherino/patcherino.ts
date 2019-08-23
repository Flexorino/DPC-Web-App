import { filter, map } from 'rxjs/operators';
import { Patch } from './patch';
import { IdentifierArray } from './id_patch_array';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { ReferenceAst } from '@angular/compiler';
export class Patcherino {

    public static applyOn(anchor: any, patch: Patch) {
        let map = this.createObjectMap(anchor, patch);
        patch.patches.forEach(x => this.apply(map, x, 'patch', anchor));
        patch.puts.forEach(x => this.apply(map, x, 'put', anchor));
    }

    private static apply(map: any, rule: any, mode: string, anchor: any) {

        let obj = null;
        if (rule.id) {
            obj = map[rule.id];
        } else {
            obj = anchor;
        }
        let props: Array<any> = Object.keys(rule);

        if (mode === "put") {
            for (let propy in obj) {
                if (propy !== "id") {
                    delete obj[propy];
                }
            }
        }
        for (let propy in rule) {
            if (propy !== "id") {
                console.log(propy);
                if (Array.isArray(rule[propy])) {
                    obj[propy] = [];
                    rule[propy].forEach(x => {
                        if (typeof (x) === 'object' && x["id"]) {
                            obj[propy].push(map[x.id]);
                        } else {
                            obj[propy].push(x);
                        }
                    });
                } else {
                    obj[propy] = rule[propy];
                }
            }
        }
    }



    private static createObjectMap(anchor: any, patch: Patch) {
        let objects = this.deepSearch(anchor, []);
        let set = new Set();
        let typeDefs = {};
        patch.patches.forEach(x => {
            let refRes = this.getRefsOfPatchObjects(x);
            refRes.ids.forEach(y => set.add(y));
            typeDefs = { ...typeDefs, ...refRes.typeDefs };
        });
        patch.puts.forEach(x => {
            let refRes = this.getRefsOfPatchObjects(x);
            refRes.ids.forEach(y => set.add(y));
            typeDefs = { ...typeDefs, ...refRes.typeDefs };
        });
        console.log("set:");
        set.forEach(x => console.log(x));
        let toCreate = [];
        Array.from(set).filter(x => !Object.keys(objects).includes(x)).forEach(element => {
            toCreate.push(element);
        });
        toCreate.forEach(x => {
            if (typeDefs[x]) {
                objects[x] = new typeDefs[x](x);
            } else {
                objects[x] = { id: x };
            }
        });
        return objects;
    }

    private static getRefsOfPatchObjects(obj: any) {
        let ids = [];
        let typeDef = {};
        ids.push(obj["id"]);
        if (obj.constructor !== Object) {
            typeDef[obj.id] = obj.constructor;
        } else if (obj._type) {
            typeDef[obj.id] = obj._type;
        }
        for (let prop in obj) {
            let propValue = obj[prop];
            let z = typeof (propValue);
            if (typeof (propValue) === 'object') {
                if (propValue["id"] && !ids.includes(propValue["id"])) {
                    ids.push(propValue["id"]);
                    if (propValue.constructor !== Object) {
                        typeDef[propValue.id] = propValue.constructor;
                    } else if (propValue._type) {
                        typeDef[propValue.id] = propValue._type;
                    }
                }
            }
            if (Array.isArray(propValue)) {
                propValue.forEach(x => {
                    if (typeof (x) === 'object') {
                        if (x["id"] && !ids.includes(x["id"])) {
                            ids.push(x["id"]);
                            if (x.constructor !== Object) {
                                typeDef[x.id] = x.constructor;
                            } else if (x._type) {
                                typeDef[x.id] = x._type;
                            }
                        }
                    }
                });
            }
        }
        return { ids: ids, typeDefs: typeDef };
    }

    private static deepSearch(node: any, alreadyVisited: Array<any>): any {
        let erg = {};
        erg[node["id"]] = node;
        console.log("Besuche " + node["id"]);
        console.log("habe schon besucht:");
        alreadyVisited.forEach(x => console.log(x.id));
        console.log("______________");
        for (let prop in node) {
            let propValue = node[prop];
            let z = typeof (propValue);
            if (Array.isArray(propValue)) {
                let array: Array<any> = propValue;
                array.forEach(x => {
                    if (typeof (x) === 'object') {
                        let ress = !alreadyVisited.includes(x);
                        if (x["id"] && ress) {
                            let patialErg = this.deepSearch(x, Object.values(erg).concat(alreadyVisited));
                            erg = { ...erg, ...patialErg };
                        }
                    }
                }
                );
            }
            if (typeof (propValue) === 'object') {
                let ress = !alreadyVisited.includes(propValue);
                if (propValue["id"] && ress) {
                    let patialErg = this.deepSearch(propValue, Object.values(erg).concat(alreadyVisited));
                    erg = { ...erg, ...patialErg };
                }
            }
        }
        return erg;
    }
}