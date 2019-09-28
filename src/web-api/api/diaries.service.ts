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
import { InlineObject } from '../model/inlineObject';
import { InlineObject1 } from '../model/inlineObject1';
import { InlineResponse2001 } from '../model/inlineResponse2001';
import { InlineResponse200Tags } from '../model/inlineResponse200Tags';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class DiariesService {

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
     * Erzeuge ein neues Tagebuch.
     * Der Erzeuger des Tagebuches verwaltet es automatisch. Präferenzen beziehen sich immer auf den momentanen Nutzer. Beim erstellen eines Tagebuches, muss wenigstens der Name des Tagebuches in den Präferenzen hinterlegt werden.
     * @param inlineObject 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addDiary(inlineObject?: InlineObject, observe?: 'body', reportProgress?: boolean): Observable<FullDiary>;
    public addDiary(inlineObject?: InlineObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FullDiary>>;
    public addDiary(inlineObject?: InlineObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FullDiary>>;
    public addDiary(inlineObject?: InlineObject, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<FullDiary>(`${this.configuration.basePath}/diaries`,
            inlineObject,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Erstelle einen neuen Kontext.
     * Es muss nur der Zeitstempel angegeben werden, ab welchem der Kontext gelten soll. Weiterhin sollten dann nur Attribute engegeben werden müssen, die sich geändert haben. Alle weiteren Werte bleiben unverändert und werden somit (sofern vorhanden) aus dem alten Kontext übernommen. Das hängt u.a. damit zusammen wie die Serverseite diese Änderung bearbeitet. Der Server oder DB wird vermutlich nur bei jedem einzelenn Attribut z.B. KE-Faktoren speichern wann es sich geändert hat und nicht ein komplett neuen Kontext speichern, in welchem alle Werte die gleichgeblieben sind wiederholt werden. Auf der Client-Seite wäre so eine Darstellung aber vermutlich nicht angebracht, da ein Nutzer oder Client immer nur diskret sehen möchte wann sich überhaupt etwas geändert hat. Eine Auschlüsselung auf verschiedene Attribute wäre vermutlich zu viel.
     * @param diaryId Die Id des Tagebuches.
     * @param insulinId ID des Insulins
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addDiaryContext(diaryId: string, insulinId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addDiaryContext(diaryId: string, insulinId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addDiaryContext(diaryId: string, insulinId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addDiaryContext(diaryId: string, insulinId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling addDiaryContext.');
        }
        if (insulinId === null || insulinId === undefined) {
            throw new Error('Required parameter insulinId was null or undefined when calling addDiaryContext.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/contexts`,
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
     * Erstelle ein neues Medikament
     * ...
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addDiaryDrug(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200Tags>;
    public addDiaryDrug(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200Tags>>;
    public addDiaryDrug(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200Tags>>;
    public addDiaryDrug(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling addDiaryDrug.');
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


        return this.httpClient.post<InlineResponse200Tags>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/drugs`,
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
     * Erstelle ein neues Medikament
     * ...
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addDiaryInsulin(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200Tags>;
    public addDiaryInsulin(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200Tags>>;
    public addDiaryInsulin(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200Tags>>;
    public addDiaryInsulin(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling addDiaryInsulin.');
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


        return this.httpClient.post<InlineResponse200Tags>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/insulins`,
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
     * Ein Tagebuch löschen.
     * Nur der Besitzer eines Tagebuches kann auch das Tagebuch löschen. Dieses Recht wird implizit aus der Authentifizierung abgeleitet und kann nicht delegiert werden.
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDiary(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteDiary(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteDiary(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteDiary(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling deleteDiary.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Lösche ein Medikament
     * Überpüfen, ob überhaupt machbar wegen Lösch-Problematik.
     * @param diaryId Die Id des Tagebuches.
     * @param drugId ID des Medikaments
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDiaryDrug(diaryId: string, drugId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteDiaryDrug(diaryId: string, drugId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteDiaryDrug(diaryId: string, drugId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteDiaryDrug(diaryId: string, drugId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling deleteDiaryDrug.');
        }
        if (drugId === null || drugId === undefined) {
            throw new Error('Required parameter drugId was null or undefined when calling deleteDiaryDrug.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/drugs/${encodeURIComponent(String(drugId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Lösche ein Insulin
     * Überpüfen, ob überhaupt machbar wegen Lösch-Problematik.
     * @param diaryId Die Id des Tagebuches.
     * @param insulinId ID des Insulins
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDiaryInsulin(diaryId: string, insulinId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteDiaryInsulin(diaryId: string, insulinId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteDiaryInsulin(diaryId: string, insulinId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteDiaryInsulin(diaryId: string, insulinId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling deleteDiaryInsulin.');
        }
        if (insulinId === null || insulinId === undefined) {
            throw new Error('Required parameter insulinId was null or undefined when calling deleteDiaryInsulin.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/insulins/${encodeURIComponent(String(insulinId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Bekomme alle statischen Informationen über ein Tagebuch.
     * Zu den statischen Informationen zählen Name des Tagebuchs, Patient, Medikamente und Insuline. Diese Informationen werden nicht zeitlich versioniert.
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDiary2(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<FullDiary>;
    public getDiary2(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FullDiary>>;
    public getDiary2(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FullDiary>>;
    public getDiary2(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling getDiary2.');
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


        return this.httpClient.get<FullDiary>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Erhalte eine Auflistung der verwendeten Medikamente eines Tagebuches.
     * Dieser Punkt hat auch erst einmal geringer Priorität. Es muss geguckt werden, ob es einen eigenen get End-Point für ein Medikament geben muss. Genauso wie bei Tags und Insulinen ergibt sich hier eine Lösch-Problematik.
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDiaryDrugs(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2001>;
    public getDiaryDrugs(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2001>>;
    public getDiaryDrugs(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2001>>;
    public getDiaryDrugs(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling getDiaryDrugs.');
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


        return this.httpClient.get<InlineResponse2001>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/drugs`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Erhalte eine Auflistung der verwendeten Insuline eines Tagebuches
     * Tags sollen dafür benutzt werden, dass der Nutzer selbst Zuordnungen machen kann. Z.B. könnte ein Nutzer ein Tag \&#39;Vor dem Essen\&#39; machen. Da die Informationen zu einem Tag kurz sind, gibt es keine eigenen Get Tag \&#39;ID\&#39; Endpoint sondern dieser wird nur zum Aktualisieren und löschen eines Tags benutzt.
     * @param diaryId Die Id des Tagebuches.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDiaryInsulins(diaryId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getDiaryInsulins(diaryId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getDiaryInsulins(diaryId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getDiaryInsulins(diaryId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling getDiaryInsulins.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/insulins`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Die statischen Tagebuch infomrationen aktualisieren.
     * An dieser Stelle können die Basis Informationen eines Tagebuches aktualisiert werden. Um Medikamente, Insuline oder Tags zu aktualisieren, müssen die einzelnen Sub-Ressourcen verwendet werden. An dieser Stelle ist zu sehen, dass es nicht vorgesehen ist, den Besitzer eines Tagebuches zu ändern.
     * @param diaryId Die Id des Tagebuches.
     * @param inlineObject1 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDiary(diaryId: string, inlineObject1?: InlineObject1, observe?: 'body', reportProgress?: boolean): Observable<FullDiary>;
    public updateDiary(diaryId: string, inlineObject1?: InlineObject1, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FullDiary>>;
    public updateDiary(diaryId: string, inlineObject1?: InlineObject1, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FullDiary>>;
    public updateDiary(diaryId: string, inlineObject1?: InlineObject1, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling updateDiary.');
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


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<FullDiary>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}`,
            inlineObject1,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Aktualisiere die Informationen eines Medikaments
     * Diese Funktion muss erst einmal nicht umgesetzt werden. Es könnte sowieso nur der Name geändert werden.
     * @param diaryId Die Id des Tagebuches.
     * @param drugId ID des Medikaments
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDiaryDrug(diaryId: string, drugId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateDiaryDrug(diaryId: string, drugId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateDiaryDrug(diaryId: string, drugId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateDiaryDrug(diaryId: string, drugId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling updateDiaryDrug.');
        }
        if (drugId === null || drugId === undefined) {
            throw new Error('Required parameter drugId was null or undefined when calling updateDiaryDrug.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.patch<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/drugs/${encodeURIComponent(String(drugId))}`,
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
     * Aktualisiere die Informationen eines Medikaments
     * Diese Funktion muss erst einmal nicht umgesetzt werden. Es könnte sowieso nur der Name geändert werden.
     * @param diaryId Die Id des Tagebuches.
     * @param insulinId ID des Insulins
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDiaryInsulin(diaryId: string, insulinId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateDiaryInsulin(diaryId: string, insulinId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateDiaryInsulin(diaryId: string, insulinId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateDiaryInsulin(diaryId: string, insulinId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (diaryId === null || diaryId === undefined) {
            throw new Error('Required parameter diaryId was null or undefined when calling updateDiaryInsulin.');
        }
        if (insulinId === null || insulinId === undefined) {
            throw new Error('Required parameter insulinId was null or undefined when calling updateDiaryInsulin.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.patch<any>(`${this.configuration.basePath}/diaries/${encodeURIComponent(String(diaryId))}/insulins/${encodeURIComponent(String(insulinId))}`,
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
