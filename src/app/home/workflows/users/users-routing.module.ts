import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";

const routes: Routes = [
    { 
        path: '', 
        component: UsersComponent,
        children: [
            { path: 'my-incidents', loadChildren: './my-incidents/my-incidents.module#MyIncidentsModule' },
            { path: 'new-incident', loadChildren: './new-incident/new-incident.module#NewIncidentUSersModule' },
            { path: '', redirectTo: '/home/users/my-incidents', pathMatch: 'full' },
        ]   
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
