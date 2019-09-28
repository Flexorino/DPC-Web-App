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


export interface EntryReprResponseMedication { 
    /**
     * Die ID des Medikaments
     */
    medicationID?: string;
    /**
     * Kleiner Text, in welchem Details zur Einnahme notiert werden können.
     */
    intakeDescription?: string;
    /**
     * Der Name des Medikaments
     */
    medicationName?: string;
}

