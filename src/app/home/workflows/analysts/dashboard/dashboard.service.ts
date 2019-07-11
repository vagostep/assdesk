import { Injectable } from "@angular/core";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { AssetsEndpoints } from "../../commons/endpoints/assets.endpoint";

@Injectable()
export class DashboardService {

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

    public searchByCustomer(page: number, size: number, sort?: string, username?: string): Promise<any> {

        if (!username) {

            username = localStorage.getItem('username');
        }
        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.getAnalystIncidents(page-1, size, sort, username, 'EN_PROGRESO')
            .subscribe((resp) => {
                console.log('resp', resp);
                resolve(resp);
            }, (err) => reject(err) );
        })
    }

    public getAttentions(): Promise<any> {

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.getAttentions(localStorage.getItem('username'))
            .subscribe((resp) => {
                
                resolve(resp);
            }, (err) => reject(err) );
        })
    }

    public getOpen(): Promise<any> {

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.getDashboard()
            .subscribe((resp) => {
                
                resolve(resp);
            }, (err) => reject(err) );
        })
    }
}