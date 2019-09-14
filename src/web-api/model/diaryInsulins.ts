/**
 * Diabetes Web-App
 * Die ist die vorläufige REST-artige Schnittstelle, für das Dia-PC Projekt. Diese Schnittstelle ist nicht REST, da sie nicht Hypermedialität benutzt - Das bedeutet, der Client muss selbt Anfragen konstruieren. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface DiaryInsulins { 
    name?: string;
    description?: string;
    insulinType?: DiaryInsulins.InsulinTypeEnum;
}
export namespace DiaryInsulins {
    export type InsulinTypeEnum = 'fast' | 'normal' | 'slow';
    export const InsulinTypeEnum = {
        Fast: 'fast' as InsulinTypeEnum,
        Normal: 'normal' as InsulinTypeEnum,
        Slow: 'slow' as InsulinTypeEnum
    };
}


