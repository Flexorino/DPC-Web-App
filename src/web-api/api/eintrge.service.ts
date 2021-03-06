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

import { EntryReprResponse } from '../model/entryReprResponse';
import { InlineResponse2002 } from '../model/inlineResponse2002';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class EintrgeService {

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
     * Erstelle einen neuen Eintrag in dem Tagebuch.
     * Generell muss nur ein Zeitstempel angegeben werden und die anderen Attribute sind optional. Das bedeutet, dass z.B. bei einer BZ-Messung nur der Zeitstempel und Blutzcker-Wert übergeben werden muss. Der Aufrufer dieser Methode muss selbst darauf achten, dass die richtigen Medikamenten und Insulin-IDs übertragen werden. Falsche IDs führen zu einem Fehler.
     * @param diaryId Die ID des Tagebuches, bei welchem ein Eintrag hinzugefügt werden soll.
     * @param entryReprResponse Eine Repräsentation des zu erstellenden Tagebuch-Eintrages
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addDiaryEntry(diaryId: string, entryReprResponse?: EntryReprResponse, observe?: 'body', reportProgress?: boolean): Observable<EntryReprResponse>;
    public addDiaryEntry(diaryId: string, entryReprResponse?: EntryReprResponse, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EntryReprResponse>>;
    public addDiaryEntry(diaryId: string, entryReprResponse?: EntryReprResponse, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EntryReprResponse>>;
    public addDiaryEntry(diaryId: string, entryReprResponse?: EntryReprResponse, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling addDiaryEntry.');
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


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<EntryReprResponse>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/entries`,
            entryReprResponse,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Lösche einen Eintrag
     * Hier muss nochmal überlegt werden, ob und wie Einträge gelöscht werden. Ein anderer Ansatz wäre, dass Einträge ein active Flag haben, dass bei einem Patch gesetzt wird - Das bei einem Delete auszuführen wäre vermutlich laut Rest falsch.
     * @param diaryId Die Id des Tagebuches.
     * @param entryId ID des Eintrages
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDiaryEntry(diaryId: string, entryId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteDiaryEntry(diaryId: string, entryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteDiaryEntry(diaryId: string, entryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteDiaryEntry(diaryId: string, entryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling deleteDiaryEntry.');
        }
        if (entryId === null || entryId === undefined) {
            throw new Error('Required parameter entryId was null or undefined when calling deleteDiaryEntry.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/entries/${encodeURIComponent(String(entryId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Erhalte alle Entries. Optional sollten Such-Kriterien oder Filter angegeben werden können.
     * &lt;ul&gt; &lt;li&gt; Allgemeine (einache) Suchparameter, werden in der URL-Quey angegeben. &lt;/li&gt; &lt;li&gt; Komplexe Such-Abfragen werden im Body angegeben. Hier müsste man dann gucken, wie das umsetzbar ist (vorallem mit Caches) da Bodies in Get-Anfragen unüblich sind. &lt;ul&gt; &lt;li&gt; Es muss auch überlegt werden, ob eine Filterung nach bestimmten Kriterien überhaupt Serverseitig passieren soll, oder clientseitig. &lt;/li&gt; &lt;li&gt; Natürlich unterstützt Swagger keine Bodies in Get anfragen. -&gt; Entweder selbst händisch im Code einfügen, oder in Post und Get aufteilen (Post Filter-Daten, Kriege Such ID zurück, mache Get auf Such-Ressource mit ID. ISt für Cachen aber auch nicht gut). &lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;li&gt; Es muss noch überprüft werden, ob die Entries in dieser Liste nur ein Subset der Informationen enthalten sollen und alle Informationen eines Eintrages erst mit dem Get-Request zu dem spezifischen Entry einsehbar sind. &lt;/li&gt; &lt;/ul&gt;
     * @param diaryId Die Id des Tagebuches.
     * @param from Zeit in Unix-Zeit (Einschließlich)
     * @param to Zeit in Unix-Zeit (Einschließlich)
     * @param limit Die Anzahl der maximalen Einträge, die zurückgegeben werden sollen. Ist nur mit order gültig.
     * @param order Ob die Einträge beginnend von dem ältesten oder neusten Eintrag sortiert zurückgegeben werden sollen.
     * @param showDeactivatedEntries Je nachdem, wie das Löschen umgesetzt wird, wäre dieses Parameter evtl. sinnvoll.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDiaryEntries(diaryId: string, from?: number, to?: number, limit?: number, order?: 'asc' | 'desc', showDeactivatedEntries?: boolean, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2002>;
    public getDiaryEntries(diaryId: string, from?: number, to?: number, limit?: number, order?: 'asc' | 'desc', showDeactivatedEntries?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2002>>;
    public getDiaryEntries(diaryId: string, from?: number, to?: number, limit?: number, order?: 'asc' | 'desc', showDeactivatedEntries?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2002>>;
    public getDiaryEntries(diaryId: string, from?: number, to?: number, limit?: number, order?: 'asc' | 'desc', showDeactivatedEntries?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling getDiaryEntries.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', <any>from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', <any>to);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', <any>order);
        }
        if (showDeactivatedEntries !== undefined && showDeactivatedEntries !== null) {
            queryParameters = queryParameters.set('showDeactivatedEntries', <any>showDeactivatedEntries);
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


        return this.httpClient.get<InlineResponse2002>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/entries`,
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
     * Erhalte eine Detaillierte Repräsentation eines Eintrages.
     * Hier sollten alle ausführlichen Informationen gezeigt werden, die es zu einem Eintrag gibt. Eventuell wäre es auch sinnvoll aufzuzeigen oder zu verlinken, wer was gemacht hat [Aber erst später]. &lt;br&gt; Evtl. ist dieser Endpoint später auch nur noch nützlich, um für einen Eintrag eine Historie anzuzeigen. 
     * @param diaryId Die Id des Tagebuches.
     * @param entryId ID des Eintrages
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDiaryEntry(diaryId: string, entryId: string, observe?: 'body', reportProgress?: boolean): Observable<EntryReprResponse>;
    public getDiaryEntry(diaryId: string, entryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EntryReprResponse>>;
    public getDiaryEntry(diaryId: string, entryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EntryReprResponse>>;
    public getDiaryEntry(diaryId: string, entryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling getDiaryEntry.');
        }
        if (entryId === null || entryId === undefined) {
            throw new Error('Required parameter entryId was null or undefined when calling getDiaryEntry.');
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


        return this.httpClient.get<EntryReprResponse>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/entries/${encodeURIComponent(String(entryId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Aktualisiere einen Eintrag.
     * Hier sollten natürlich nur die Felder angegeben werden, die auch aktualisiert werden sollen.
     * @param diaryId Die Id des Tagebuches.
     * @param entryId ID des Eintrages
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDiaryEntry(diaryId: string, entryId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateDiaryEntry(diaryId: string, entryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateDiaryEntry(diaryId: string, entryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateDiaryEntry(diaryId: string, entryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling updateDiaryEntry.');
        }
        if (entryId === null || entryId === undefined) {
            throw new Error('Required parameter entryId was null or undefined when calling updateDiaryEntry.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.patch<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/entries/${encodeURIComponent(String(entryId))}`,
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
