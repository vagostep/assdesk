import { Injectable } from "@angular/core";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { Binnacle } from "../commons/models/binnacle.interface";

@Injectable()
export class BinnacleService {

    constructor(private incidentEndpoints: IncidentEndpoints) {}
    
    public getBinnaclesByCause(cause: string): Promise<Binnacle[]> {

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.getSolutions(cause)
            .subscribe((resp) => {
                console.log('Binnacles', resp);
                resolve(resp);
            }, (err) => reject(err));
        });
    }

    public getBinnaclesByFailure(failure: string): Promise<Binnacle[]> {

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.getSolutions(undefined, failure)
            .subscribe((resp) => {
                console.log('Binnacles', resp);
                resolve(resp);
            }, (err) => reject(err));
        });
    }
}