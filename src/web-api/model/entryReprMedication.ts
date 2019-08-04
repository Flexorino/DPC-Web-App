/**
 * Diabetes Web-App
 * Die ist die vorl�ufige REST-artige Schnittstelle, f�r das Dia-PC Projekt. Diese Schnittstelle ist nicht REST, da sie nicht Hypermedialit�t benutzt - Das bedeutet, der Client muss selbt Anfragen konstruieren. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface EntryReprMedication { 
    /**
     * Die ID des Medikaments
     */
    medicationID?: string;
    /**
     * Kleiner Text, in welchem Details zur Einnahme notiert werden k�nnen.
     */
    intakeDescription?: string;
}

