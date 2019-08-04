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


/**
 * Der Nutzer, dem diese Freigabe gegeben wurde
 */
export interface GrantUser { 
    /**
     * Die Id des Nutzers
     */
    id?: string;
    /**
     * Der Name des Nutzers, damit diese Eigenschaft nicht noch exta abgefraft werden muss.
     */
    name?: string;
}

