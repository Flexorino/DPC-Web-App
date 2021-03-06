/**
 * DPC-API
 * Die ist die REST-artige Schnittstelle, für das DPC-Projekt.
 *
 * The version of the OpenAPI document: 3.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface FoodDescr { 
    id?: string;
    resorption?: FoodDescr.ResorptionEnum;
    carbsFactor?: number;
    comment?: string;
    name?: string;
}
export namespace FoodDescr {
    export type ResorptionEnum = 'fast' | 'medium' | 'slow';
    export const ResorptionEnum = {
        Fast: 'fast' as ResorptionEnum,
        Medium: 'medium' as ResorptionEnum,
        Slow: 'slow' as ResorptionEnum
    };
}


