import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { EditIncidentComponent } from "./edit-incident.component";

const routes: Routes = [
    { path: '', component: EditIncidentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditIncidentRoutingModule {}