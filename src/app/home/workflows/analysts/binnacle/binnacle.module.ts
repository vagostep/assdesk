import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ComponentsModule } from "app/components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { DirectivesModule } from "../../commons/directives/directives.module";
import { BinnacleComponent } from "./binnacle.component";
import { BinnacleRoutingModule } from "./binnacle-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectivesModule,
        ReactiveFormsModule,
        BinnacleRoutingModule,
        ComponentsModule
    ],
    declarations: [
        BinnacleComponent
    ],
    providers: [
        IncidentEndpoints
    ]
})
export class BinnacleModule {}