import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webdproject';

  constructor(private router: Router) {}

  goToLandingPage(pageName: string){
    this.router.navigate([`${pageName}`]);
  }
}
