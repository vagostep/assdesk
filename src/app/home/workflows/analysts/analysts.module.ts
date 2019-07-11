import { NgModule } from "@angular/core";
import { AnalystsRoutingModule } from "./analysts-routing.module";
import { AnalystsComponent } from "./analysts.component";

@NgModule({
    imports: [AnalystsRoutingModule],
    declarations: [AnalystsComponent]
})
export class AnalystsModule { }