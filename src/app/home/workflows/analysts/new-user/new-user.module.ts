import { NgModule } from "@angular/core";
import { NewUserComponent } from "./new-user.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NewUserRoutingModule } from "./new-user-routing.module";
import { ComponentsModule } from "app/components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { AssetsEndpoints } from "../../commons/endpoints/assets.endpoint";
import { PersonsEndpoints } from "../../commons/endpoints/persons.endpoint";
import { ChannelsEndpoints } from "../../commons/endpoints/channels.endpoint";
import { AnalystsEndpoints } from "../../commons/endpoints/analysts.endpoint";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        NewUserRoutingModule,
        ComponentsModule
    ],
    declarations: [
        NewUserComponent
    ],
    providers: [
        IncidentEndpoints,
        ChannelsEndpoints,
        PersonsEndpoints,
        AssetsEndpoints,
        AnalystsEndpoints
    ]
})
export class NewUserAnalystsModule {}