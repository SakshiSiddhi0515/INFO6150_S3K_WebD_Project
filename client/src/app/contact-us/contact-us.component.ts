// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-contact-us',
//   templateUrl: './contact-us.component.html',
//   styleUrls: ['./contact-us.component.css']
// })
// export class ContactUsComponent implements OnInit {
//   contactForm: FormGroup;
//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit() {
//     this.contactForm = this.formBuilder.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       mobile: ['', Validators.required],
//       message: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.contactForm.valid) {
//       // send message using a service or HTTP request
//       console.log(this.contactForm.value);
//       this.contactForm.reset();
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,]],
      mobile: ['', Validators.required],
      message: ['', Validators.required]
    });
  }



onSubmit() {
  if (this.contactForm.valid) {
    // send message using a service or HTTP request
    console.log(this.contactForm.value);
    this.contactForm.reset();
    alert('Form submitted successfully!');
  } else {
    alert('Please fill out all required fields.');
  }
}
}

