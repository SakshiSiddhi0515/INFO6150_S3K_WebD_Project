import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SecondPageComponent } from './second-page/second-page.component';

const routes: Routes = [

  {
    path: 'landingPage', 
    component: LandingPageComponent
  },

  {
    path: 'secondPage',
    component: SecondPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
