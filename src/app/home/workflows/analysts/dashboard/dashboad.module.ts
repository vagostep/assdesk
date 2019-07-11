import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ComponentsModule } from "app/components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IncidentEndpoints } from "../../commons/endpoints/incidents.endpoint";
import { DirectivesModule } from "../../commons/directives/directives.module";
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectivesModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        ComponentsModule,
        GoogleChartsModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        IncidentEndpoints
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}