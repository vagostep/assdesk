import { Injectable } from "@angular/core";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";

@Injectable()
export class MyIncidentsService {

    constructor(private incidentEndpoints: IncidentEndpoints) {}

    public getIncidentByNumber(number: string): Promise<any> {

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.getIndicent(number)
            .subscribe((resp) => {
                console.log('Incidend', resp);
                if (Object.keys(resp).length === 0) {
                    resolve();
                } else {
                    resolve(resp);
                }
            })
        })
    }

    public searchByCustomer(page: number, size: number, sort?: string, username?: string, startDate?: any, endDate?: any, state: string = 'EN_PROGRESO'): Promise<any> {

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.getIncidents(page-1, size, sort, username, startDate, endDate, state)
            .subscribe((resp) => {
                console.log('resp', resp);
                resolve(resp);
            }, (err) => reject(err) );
        })
    }
}