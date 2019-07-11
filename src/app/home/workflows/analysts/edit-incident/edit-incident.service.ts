import { Injectable } from "@angular/core";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { AssetsEndpoints } from "../../commons/endpoints/assets.endpoint";
import { PersonsEndpoints } from "../../commons/endpoints/persons.endpoint";
import { User } from "app/shared/models/user.interface";
import { Parameter } from "app/shared/models/parameter.interface";
import { ChannelsEndpoints } from "../../commons/endpoints/channels.endpoint";
import { AnalystsEndpoints } from "../../commons/endpoints/analysts.endpoint";
import { Analyst } from "app/shared/models/analyst.interface";
import { Asset } from "app/shared/models/asset.interface";

@Injectable()
export class EditIncidentService {

    constructor(private incidentEndpoints: IncidentEndpoints,
                private assetsEndpoints: AssetsEndpoints,
                private personsEndpoints: PersonsEndpoints,
                private channelsEndpoints: ChannelsEndpoints,
                private analystsEndpoints: AnalystsEndpoints) {}

    public getAnalystsByLevel(level: string): Promise<Analyst[]> {

        return new Promise( (resolve, reject) => {

            this.analystsEndpoints.getAnalystsByLevel(level)
            .subscribe((resp) => {
                console.log('Analysts', resp);
                resolve(resp);
            }, (err) => reject(err));
        });
    }

    public getChannels(): Promise<Parameter[]> {

        return new Promise( (resolve, reject) => {

            this.channelsEndpoints.getChannelsActive()
            .subscribe((resp) => {
                console.log('Channels', resp);
                resolve(resp);
            }, (err) => reject(err));
        });
    }

    public getCustomerFull(username: string): Promise<User> {

        return new Promise( (resolve, reject) => {

            this.personsEndpoints.getCustomerFull(username)
            .subscribe((resp) => {
                console.log('User', resp);
                resolve(resp);
            }, (err) => {

                console.log('Error', err);
                switch (err.status) {

                    case 404:
                        const user = { customer: {}, assets: new Array<Asset>()} as User;
                        resolve(user);
                        break;

                    default:
                        reject(err.statusText);
                        break;
                }
            });
        });
    }

    public saveIndicent(failure: string, status: string, channel: number, code: string, analist: string, priority: string, cause: string, customer: string, solution: string, massive: string): Promise<any> {

        const body = {
            priority,
            status,
            cause,
            solution,
            failure,
            channel, 
            asset: {
                code
            },
            analyst: {
                username: analist
            },
            customer: {
                username: customer
            },
            massive
        };

        return new Promise( (resolve, reject) => {

            this.incidentEndpoints.save(body)
            .subscribe((resp) => {
                console.log('resp', resp);
                resolve(resp);
            }, (err) => reject(err) );
        })
    }

    public getIncidentsByAsset(asset: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.incidentEndpoints.getIndicentsByAsset(asset)
            .subscribe((resp) => {
                console.log('Incidents', resp);
                resolve(resp)
            }, (err) => reject(err));
        })
    }

    public getIncidentByNumber(incident: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.incidentEndpoints.getIndicent(incident)
            .subscribe((resp) => {
                console.log('Incident', resp);
                resolve(resp)
            }, (err) => reject(err));
        })
    }
}