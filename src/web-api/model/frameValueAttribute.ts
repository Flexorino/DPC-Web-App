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


export interface FrameValueAttribute { 
    id?: string;
    lowerBSLimit?: number;
    higherBSLimit?: number;
    hyperglycemiaLimit?: number;
    hypoglycemiaLimit?: number;
    /**
     * Es liegt am Client herauszufinden, ob der Nutzer einen statischen Wert hat, wenn z.B. alle Werte glei sind
     */
    dailyBSGoalValues?: Array<number>;
}

