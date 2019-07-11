import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Parameter } from "app/shared/models/parameter.interface";

@Injectable()
export class ChannelsEndpoints {

    constructor(private http: HttpClient) {}

    public getChannelsActive(): Observable<Parameter[]> {

        return this.http.get<Parameter[]>(`/assdesk-incident/channels?status=1`);
    }
}