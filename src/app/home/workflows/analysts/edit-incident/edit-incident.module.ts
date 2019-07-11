import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ComponentsModule } from "app/components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { AssetsEndpoints } from "../../commons/endpoints/assets.endpoint";
import { PersonsEndpoints } from "../../commons/endpoints/persons.endpoint";
import { ChannelsEndpoints } from "../../commons/endpoints/channels.endpoint";
import { AnalystsEndpoints } from "../../commons/endpoints/analysts.endpoint";
import { IncidentsByAssetsComponent } from "app/shared/enums/modals/incidents-by-asset.component";
import { IncidentsByAssetsModule } from "app/shared/enums/modals/incidents-by-asset.module";
import { EditIncidentRoutingModule } from "./edit-incident-routing.module";
import { EditIncidentComponent } from "./edit-incident.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        EditIncidentRoutingModule,
        ComponentsModule,
        IncidentsByAssetsModule
    ],
    declarations: [
        EditIncidentComponent
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
export class EditIncidentAnalystsModule {}