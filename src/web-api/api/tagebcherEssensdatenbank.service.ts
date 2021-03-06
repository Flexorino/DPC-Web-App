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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { FullDiary } from '../model/fullDiary';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class TagebcherEssensdatenbankService {

    protected basePath = 'https://dia-pc.flexus.click/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Bekomme alle Nahrungen des 
     * Zu den statischen Informationen zählen Name des Tagebuchs, Patient, Medikamente und Insuline. Diese Informationen werden nicht zeitlich versioniert.
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDiary(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<FullDiary>;
    public getDiary(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FullDiary>>;
    public getDiary(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FullDiary>>;
    public getDiary(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling getDiary.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<FullDiary>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/food`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
