import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-incidents-by-asset',
    templateUrl: './incidents-by-asset.component.html',
    styleUrls: ['./incidents-by-asset.component.scss']
})
export class IncidentsByAssetsComponent {

    @Input() incidents: any[];

    constructor() {}
}