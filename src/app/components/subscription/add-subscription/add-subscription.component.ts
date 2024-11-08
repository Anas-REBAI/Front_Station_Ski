import { Component, OnInit } from '@angular/core';
import { SubcriptionService } from '../../../services/subscription.service';
import { Subscription } from '../../../models/subscription';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsubscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']  // Corrected styleUrls
})
export class AddSubscriptionComponent implements OnInit {  // Corrected name
  subscription!: Subscription;
  subscriptionForm!: FormGroup;

  constructor(
    private subscriptionService: SubcriptionService,
    private formBuilder: FormBuilder,
    private rt: Router
  ) {}

  // ngOnInit to initialize form
  async ngOnInit() {
    this.subscriptionForm = this.formBuilder.group({
      startDate: ["", [Validators.required]],
      endDate: ["", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],  // Added min validator for price
      typeSub: ["", Validators.required]
    });
  }

  // On form submission, make service call to add subscription
  onSubmit() {
    if (this.subscriptionForm.valid) {  // Check if the form is valid before submission
      this.subscriptionService.addSubscription(this.subscriptionForm.value)
        .subscribe({
          next: (response) => {
            console.log('Subscription added successfully:', response);
            this.rt.navigate(["/subscription"]);  // Navigate to subscription page after success
          },
          error: (error) => {
            console.error('There was an error adding the subscription:', error);
          }
        });
    }
  }
}
