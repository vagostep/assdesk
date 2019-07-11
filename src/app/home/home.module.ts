import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';

import { ComponentsModule } from '../components/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { IsUserGuard } from './workflows/commons/guards/is-user.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        HomeRoutingModule,
        NgbModule
    ],
    declarations: [ HomeComponent ],
    exports:[ HomeComponent ],
    providers: [ IsUserGuard ]
})
export class HomeModule { }
