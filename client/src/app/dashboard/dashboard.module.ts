import { NgModule } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { Dashboard } from './dashboard.routing.module';
import { HomeComponent } from '../home/home.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MessagesComponent } from '../messages/messages.component';

import {Ng7BootstrapBreadcrumbModule} from "ng7-bootstrap-breadcrumb";
import { AdminGuard } from '../services/admin.guard';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../services/auth.guard';


@NgModule({
    declarations : [
        DashboardComponent,
        HomeComponent
    ],
    imports : [
        Dashboard,
        BsDropdownModule.forRoot(),
        BrowserModule,
        Ng7BootstrapBreadcrumbModule
    ],
    exports : [

    ],
    providers : [
        AdminGuard,
        AuthGuard,
        UserService
    ]
})

export class DashboardModule {}