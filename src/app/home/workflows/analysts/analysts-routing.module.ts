import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AnalystsComponent } from "./analysts.component";

const routes: Routes = [
    { 
        path: '', 
        component: AnalystsComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboad.module#DashboardModule' },
            { path: 'new-incident', loadChildren: './new-incident/new-incident.module#NewIncidentAnalystsModule' },
            { path: 'edit-incident/:incident', loadChildren: './edit-incident/edit-incident.module#EditIncidentAnalystsModule' },
            { path: 'binnacle', loadChildren: './binnacle/binnacle.module#BinnacleModule' },
            { path: '', redirectTo: '/home/analysts/dashboard', pathMatch: 'full' },
        ]   
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalystsRoutingModule { }
