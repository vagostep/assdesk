import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "app/shared/models/user.interface";
import { Parameter } from "app/shared/models/parameter.interface";

@Injectable()
export class PersonsEndpoints {

    constructor(private http: HttpClient) {}

    public getCustomerFull(username: string): Observable<User> {

        return this.http.get<User>(`/assdesk-person/customers/full/${username}`);
    }

    public getAreas(): Observable<Parameter[]> {

        return this.http.get<Parameter[]>(`/assdesk-person/area`);
    }

    public createUser(body: any): Observable<any> {

        return this.http.post(`/assdesk-person/persons`, body);
    }
}