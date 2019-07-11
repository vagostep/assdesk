import { Injectable } from "@angular/core";
import { SignupEndpoints } from "./signup.endpoints";
import { SignupDTO } from "./models/signup.interface";

@Injectable()
export class SignupService {

    constructor(private signupEndpoints: SignupEndpoints) {}

    public signup(username: string, password: string): Promise<SignupDTO> {

        return new Promise<SignupDTO>( (resolve, reject) => {

            this.signupEndpoints.getToken(username, password)
            .subscribe( (resp: SignupDTO) => {

                localStorage.setItem('token', resp.token);
                localStorage.setItem('type', resp.type);
                localStorage.setItem('username', username);
                localStorage.setItem('authority', resp.appClientDetails.authorities[0].authority);
                resolve(resp);
            }, (err) => {
                console.log('error', err);
                reject(err);
            })
        });
    }
}