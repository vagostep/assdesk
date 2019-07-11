import { NgModule } from "@angular/core";
import { NewIncidentComponent } from "./new-incident.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NewIncidentRoutingModule } from "./new-incident-routing.module";
import { ComponentsModule } from "app/components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { AssetsEndpoints } from "../../commons/endpoints/assets.endpoint";
import { PersonsEndpoints } from "../../commons/endpoints/persons.endpoint";
import { ChannelsEndpoints } from "../../commons/endpoints/channels.endpoint";
import { AnalystsEndpoints } from "../../commons/endpoints/analysts.endpoint";
import { IncidentsByAssetsComponent } from "app/shared/enums/modals/incidents-by-asset.component";
import { IncidentsByAssetsModule } from "app/shared/enums/modals/incidents-by-asset.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        NewIncidentRoutingModule,
        ComponentsModule,
        IncidentsByAssetsModule
    ],
    declarations: [
        NewIncidentComponent
    ],
    providers: [
        IncidentEndpoints,
        ChannelsEndpoints,
        PersonsEndpoints,
        AssetsEndpoints,
        AnalystsEndpoints
    ],
    entryComponents: [
        IncidentsByAssetsComponent
    ]
})
export class NewIncidentAnalystsModule {}