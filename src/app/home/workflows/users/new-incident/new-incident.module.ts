import { NgModule } from "@angular/core";
import { NewIncidentComponent } from "./new-incident.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NewIncidentRoutingModule } from "./new-incident-routing.module";
import { ComponentsModule } from "app/components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { AssetsEndpoints } from "../../commons/endpoints/assets.endpoint";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        NewIncidentRoutingModule,
        ComponentsModule
    ],
    declarations: [
        NewIncidentComponent
    ],
    providers: [
        IncidentEndpoints,
        AssetsEndpoints
    ]
})
export class NewIncidentUSersModule {}