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
import { DiaryReference } from './diaryReference';
import { GrantUser } from './grantUser';
import { Right } from './right';


export interface Grant { 
    /**
     * Die Id des Grants. Wird gebrauccht, wenn ein Grant modifiziert werden soll.
     */
    id?: string;
    diaryReference?: DiaryReference;
    rights?: Array<Right>;
    user?: GrantUser;
}

