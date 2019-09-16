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
import { FrameValueAttribute } from './frameValueAttribute';
import { KEFactors } from './kEFactors';
import { CorrectionsFactors } from './correctionsFactors';


export interface Context { 
    id?: string;
    frameValues?: FrameValueAttribute;
    keFactors?: KEFactors;
    correctionsFactors?: CorrectionsFactors;
}

