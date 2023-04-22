import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent implements OnInit{
  subForm: FormGroup;
  public showCardDetails = false; 
  public showPaypalDetails = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    this.subForm = this.formBuilder.group({
      street: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', [Validators.required,]],
      state: ['', Validators.required],
      cardNumber: [''],
      date: [''],
      cvv: [''],
      email: ['']
    });
  }

  handleCardClick() {
    this.showCardDetails = true;
    this.showPaypalDetails = false;
  }
  
  handlePayPalClick() {
    this.showCardDetails = false;
    this.showPaypalDetails = true;
    // this.subForm.controls['cardNumber'].setValidators([]);
    // this.subForm.controls['date'].setValidators([]);
    // this.subForm.controls['cvv'].setValidators([]);
    // this.subForm.controls['email'].setValidators(Validators.required);
  }

  onSubmit() {
    if (this.subForm.valid) {
      // send message using a service or HTTP request
      console.log(this.subForm.value);
      this.subForm.reset();
      alert('Form submitted successfully!');

      this.router
      .navigate(['/dashboard/subscription-plans']);
    }
     else {
      alert('Please fill out all required fields.');
    }
  }
 
}