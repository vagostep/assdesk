import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Analyst } from "app/shared/models/analyst.interface";

@Injectable()
export class AnalystsEndpoints {

    constructor(private http: HttpClient) {}

    public getAnalystsByLevel(level: string): Observable<Analyst[]> {

        return this.http.get<Analyst[]>(`/assdesk-person/analysts?level=${level}`);
    }
}