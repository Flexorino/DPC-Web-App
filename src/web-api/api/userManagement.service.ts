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

import { InlineObject2 } from '../model/inlineObject2';
import { InlineResponse2004 } from '../model/inlineResponse2004';
import { InlineResponse2005 } from '../model/inlineResponse2005';
import { UserInfo } from '../model/userInfo';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

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
     * Erhalte Basisfnformationen und Präferenzen eines Nutzer anhand dessen Id-Tokens
     * Erhalte Basisfnformationen und Präferenzen eines Nutzer anhand dessen Id-Tokens
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSelf(observe?: 'body', reportProgress?: boolean): Observable<UserInfo>;
    public getSelf(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserInfo>>;
    public getSelf(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserInfo>>;
    public getSelf(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<UserInfo>(`${this.configuration.basePath}/self`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the diaries of the current user (from which the current user is the owner)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserDiaries(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2005>;
    public getUserDiaries(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2005>>;
    public getUserDiaries(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2005>>;
    public getUserDiaries(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<InlineResponse2005>(`${this.configuration.basePath}/user/diaries`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Erhalte Basisfnformationen über Nutzer.
     * Dieser Endpunkt soll genutzt werden, um Nutzer zu suchen, um diesen Freigaben zu geben. Dmentsprechend muss imeer ein Searchsnippet mitgelifert werden, um die Auswahl einzuschränken
     * @param searchSnipptet Es werden alle User mit den Namen ausgegeben, die diese Snippet enthalten.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUsers(searchSnipptet: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2004>;
    public getUsers(searchSnipptet: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2004>>;
    public getUsers(searchSnipptet: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2004>>;
    public getUsers(searchSnipptet: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (searchSnipptet === null || searchSnipptet === undefined) {
            throw new Error('Required parameter searchSnipptet was null or undefined when calling getUsers.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (searchSnipptet !== undefined && searchSnipptet !== null) {
            queryParameters = queryParameters.set('searchSnipptet', <any>searchSnipptet);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<InlineResponse2004>(`${this.configuration.basePath}/users`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Registirere einen neuen Nutzer
     * Der Nutzer wird erstellt. Daraufhin, kann der Nutzer sich mit den angegebenen Nutzernamen und Passwort registrieren. &lt;br&gt; Bei der Registrierung wird ein ID-Token sowie der gewünschte Nutzername übergeben. 
     * @param inlineObject2 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registerUser(inlineObject2?: InlineObject2, observe?: 'body', reportProgress?: boolean): Observable<UserInfo>;
    public registerUser(inlineObject2?: InlineObject2, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserInfo>>;
    public registerUser(inlineObject2?: InlineObject2, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserInfo>>;
    public registerUser(inlineObject2?: InlineObject2, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<UserInfo>(`${this.configuration.basePath}/users`,
            inlineObject2,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
