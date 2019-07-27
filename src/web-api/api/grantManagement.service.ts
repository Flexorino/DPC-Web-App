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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class GrantManagementService {

    protected basePath = 'https://dia-pc.flexus.click/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get the grants for diaries that were given to the user
     * Der gegebenen Zugriffsrechte sollten in einer Listen-artigen Struktur zurückgegeben werden.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getGrantsForUser(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getGrantsForUser(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getGrantsForUser(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getGrantsForUser(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.configuration.basePath}/users/grants`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the grants that are associated with the given diary
     * Diese Informationen sollten nur abrufbar sein, wenn der momentan Nutzer auch besitzer des Tagebuches ist
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getGrantsFromDiary(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getGrantsFromDiary(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getGrantsFromDiary(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getGrantsFromDiary(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling getGrantsFromDiary.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/grants`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Give someone access to a diary
     * Diese Informationen sollten nur abrufbar sein, wenn der momentan Nutzer auch besitzer des Tagebuches ist
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public grantAccessToUser(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public grantAccessToUser(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public grantAccessToUser(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public grantAccessToUser(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling grantAccessToUser.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.post<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/grants`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Revoke access
     * Diese Informationen sollten nur abrufbar sein, wenn der momentan Nutzer auch besitzer des Tagebuches ist
     * @param diaryId Die Id des Tagebuches.
     * @param grantId ID of the grant
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public revokeAccess(diaryId: string, grantId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public revokeAccess(diaryId: string, grantId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public revokeAccess(diaryId: string, grantId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public revokeAccess(diaryId: string, grantId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling revokeAccess.');
        }
        if (grantId === null || grantId === undefined) {
            throw new Error('Required parameter grantId was null or undefined when calling revokeAccess.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/grants/${encodeURIComponent(String(grantId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update access
     * Diese Informationen sollten nur abrufbar sein, wenn der momentan Nutzer auch besitzer des Tagebuches ist
     * @param diaryId Die Id des Tagebuches.
     * @param grantId ID of the grant
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateAccess(diaryId: string, grantId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateAccess(diaryId: string, grantId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateAccess(diaryId: string, grantId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateAccess(diaryId: string, grantId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling updateAccess.');
        }
        if (grantId === null || grantId === undefined) {
            throw new Error('Required parameter grantId was null or undefined when calling updateAccess.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.patch<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/grants/${encodeURIComponent(String(grantId))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
