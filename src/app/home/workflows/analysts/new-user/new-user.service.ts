import { Injectable } from "@angular/core";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { PersonsEndpoints } from "../../commons/endpoints/persons.endpoint";
import { Parameter } from "app/shared/models/parameter.interface";

@Injectable()
export class NewUserService {

    constructor(private personsEndpoints: PersonsEndpoints) {}


    public getAreas(): Promise<Parameter[]> {

        return new Promise( (resolve, reject) => {

            this.personsEndpoints.getAreas()
            .subscribe((resp) => {
                console.log('Areas', resp);
                resolve(resp);
            }, (err) => reject(err));
        });
    }

    public createUser(firstName: string, lastName: string, phone: number, email: string, area: string, floor: string, role: string): Promise<string> {

        const body = {
            firstName,
            lastName,
            phone,
            email,
            status: "1",
            area,
            floor,
            "roles": [
                {
                    "name": role,
                    "status": "1"
                }
            ]
        };

        return new Promise( (resolve, reject) => {

            this.personsEndpoints.createUser(body)
            .subscribe((resp) => {
                console.log('resp', resp);
                resolve(resp.username);
            }, (err) => reject(err) );
        })
    }
}