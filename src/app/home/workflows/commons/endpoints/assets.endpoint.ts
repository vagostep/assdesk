import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AssetsEndpoints {

    constructor(private http: HttpClient) {}

    public getByCustomer(username: string): Observable<any> {

        return this.http.get(`/assdesk-asset/assets/customers?username=${username}`);
    }
}