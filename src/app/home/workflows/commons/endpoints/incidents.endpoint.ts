import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Binnacle } from "../../analysts/commons/models/binnacle.interface";

@Injectable()
export class IncidentEndpoints {

    constructor(private http: HttpClient) {}

    public save(body: any): Observable<any> {

        return this.http.post(`/assdesk-incident/incidents`, body);
    }

    public getSolutions(cause?: string, failure?: string): Observable<Binnacle[]> {

        let params: HttpParams = new HttpParams();

        if (cause) {

            params = params.append('cause', cause);
        }

        if (failure) {

            params = params.append('failure', failure);
        }

        return this.http.get<Binnacle[]>('assdesk-incident/log-books/solutions', {
            params: params
        });
    }

    public getIndicent(number: string): Observable<any> {

        return this.http.get(`/assdesk-incident/incidents/${number}`);
    }

    public getIndicentsByAsset(asset: string): Observable<any> {

        return this.http.get(`/assdesk-incident/incidents/assets/${asset}`);
    }

    public getAttentions(analyst: string): Observable<any> {

        return this.http.get(`/assdesk-incident/incidents/dashboard/analysts/${analyst}`);
    }

    public getDashboard(): Observable<any> {

        return this.http.get(`/assdesk-incident/incidents/dashboard`);   
    }

    public getIncidents(page: number, size: number, sort?: string, username?: string, startDate?: any, endDate?: any, state?: string): Observable<any> {

        let params: HttpParams = new HttpParams().set('page', page.toString()).set('size', size.toString());

        if (sort) {

            params = params.append('sort', sort);
        }

        if (username) {

            params = params.append('username', username);
        }

        if (state) {

            params = params.append('status', state);
        }

        if (startDate) {
            
            if (startDate.day.toString().length === 1)
                startDate.day = `0${startDate.day}`;

            if (startDate.month.toString().length === 1)
                startDate.month = `0${startDate.month}`;

            params = params.append('startDate', `${startDate.day}-${startDate.month}-${startDate.year}`);
        }

        if (endDate) {

            if (endDate.day.toString().length === 1)
                endDate.day = `0${endDate.day}`;

            if (endDate.month.toString().length === 1)
                endDate.month = `0${endDate.month}`;

            params = params.append('endDate', `${endDate.day}-${endDate.month}-${endDate.year}`);
        }

        return this.http.get(`/assdesk-incident/incidents`, {
            params: params
        });
    }

    public getAnalystIncidents(page: number, size: number, sort?: string, username?: string, state?: string): Observable<any> {

        let params: HttpParams = new HttpParams().set('page', page.toString()).set('size', size.toString());

        if (sort) {

            params = params.append('sort', sort);
        }

        if (username) {

            params = params.append('username', username);
        }

        if (state) {

            params = params.append('status', state);
        }

        return this.http.get(`/assdesk-incident/incidents/analysts`, {
            params: params
        });
    }
}