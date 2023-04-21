import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { InputFileComponent } from './input-file/input-file.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const appRoutes : Routes = [
    { path : '', redirectTo: 'getStarted', pathMatch: 'full'  },
    { path : 'getStarted' , component: LandingPageComponent },
    { path : 'create' , component: LoginComponent   },
    { path : 'login', component : LoginComponent },
    { path: 'input', component: InputFileComponent}
]


export const AppRoutingProviders: any[] =  [];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
