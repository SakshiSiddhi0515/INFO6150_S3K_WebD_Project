import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit {

  constructor(  
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
  }

  routeToPaymentPage() {
    this.router
      .navigate(['/dashboard/subscription'])};
    }

