import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ComponentsModule } from "app/components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { MyIncidentsComponent } from "./my-incidents.component";
import { MyIncidentsRoutingModule } from "./my-incidents-routing.module";
import { DirectivesModule } from "../../commons/directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectivesModule,
        ReactiveFormsModule,
        MyIncidentsRoutingModule,
        ComponentsModule
    ],
    declarations: [
        MyIncidentsComponent
    ],
    providers: [
        IncidentEndpoints
    ]
})
export class MyIncidentsModule {}