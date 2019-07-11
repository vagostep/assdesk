import { Injectable } from "@angular/core";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { AssetsEndpoints } from "../../commons/endpoints/assets.endpoint";

@Injectable()
export class NewIncidentService {

    constructor(private incidentEndpoints: IncidentEndpoints,
                private assetsEndpoints: AssetsEndpoints) {}

    public getAssets(): Promise<any> {

        return new Promise( (resolve, reject) => {

            this.assetsEndpoints.getByCustomer(localStorage.getItem('username'))
            .subscribe((resp) => {
                console.log('Assets', resp);
                resolve(resp);
            }, (err) => reject(err));
        });
    }

    public saveIndicent(failure: string, code: string): Promise<any> {

        const body = {
            failure, 
            asset: {
                code
            } 
        };

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.save(body)
            .subscribe((resp) => {
                console.log('resp', resp);
                resolve(resp);
            }, (err) => reject(err) );
        })
    }
}