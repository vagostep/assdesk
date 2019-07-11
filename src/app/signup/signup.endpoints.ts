import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignupDTO } from "./models/signup.interface";

@Injectable()
export class SignupEndpoints {

    constructor(private http: HttpClient) {}

    public getToken(username: string, password: string): Observable<SignupDTO> {

        const body = {
            username,
            password
        };

        return this.http.post<SignupDTO>(`/assdesk-auth/auth/token`, body);
    }
}