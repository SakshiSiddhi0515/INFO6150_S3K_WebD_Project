import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent{

  public showCardDetails = false; 
  public showPaypalDetails = false;

  handleCardClick() {
    this.showCardDetails = true;
    this.showPaypalDetails = false;
  }
  
  handlePayPalClick() {
    this.showCardDetails = false;
    this.showPaypalDetails = true;
  }
 
}
