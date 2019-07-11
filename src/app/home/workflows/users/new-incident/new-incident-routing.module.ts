import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { NewIncidentComponent } from "./new-incident.component";

const routes: Routes = [
    { path: '', component: NewIncidentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewIncidentRoutingModule {}