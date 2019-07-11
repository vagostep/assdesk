import { NgModule } from "@angular/core";
import { IncidentsByAssetsComponent } from "./incidents-by-asset.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        IncidentsByAssetsComponent
    ],
    exports: [
        IncidentsByAssetsComponent
    ]
})
export class IncidentsByAssetsModule {
    
}