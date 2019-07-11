import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { IsUserGuard } from "./workflows/commons/guards/is-user.guard";

const routes: Routes = [
    { path: '', component: HomeComponent, 
        children: [
            { path: '', redirectTo: '/signup', pathMatch: 'full' },
            { path: 'users', loadChildren: './workflows/users/users.module#UsersModule', canActivate: [IsUserGuard] },
            { path: 'analysts', loadChildren: './workflows/analysts/analysts.module#AnalystsModule', canActivate: [] }
            // { path: 'new-incident', loadChildren: './workflows/users/new-incident/new-incident.module#NewIncidentModule', canActivate: [ IsUserGuard ] },
            // { path: 'my-incidents', loadChildren: './workflows/users/my-incidents/my-incidents.module#MyIncidentsModule', canActivate: [ IsUserGuard ] }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}