import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyIncidentsComponent } from "./my-incidents.component";

const routes: Routes = [
    { path: '', component: MyIncidentsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyIncidentsRoutingModule {}