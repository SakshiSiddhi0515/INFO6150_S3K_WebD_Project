import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { UserCreateComponent } from './user/user-create/user-create.component';


const appRoutes : Routes = [
    { path : '', redirectTo: 'create', pathMatch: 'full'  },
    { path : 'create' , component: LoginComponent   },
    { path : 'login', component : LoginComponent }
    
]


export const AppRoutingProviders: any[] =  [];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
