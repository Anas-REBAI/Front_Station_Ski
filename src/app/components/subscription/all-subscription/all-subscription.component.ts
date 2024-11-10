import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../models/subscription';
import { SubcriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-all-subscription',
  templateUrl: './all-subscription.component.html',
  styleUrls: ['./all-subscription.component.css']
})
export class AllSubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];
  editSubscriptionId: string | null = null; // Define as string to match numSub type

  constructor(private subscriptionService: SubcriptionService) {}

  ngOnInit(): void {
    this.getALL();
  }

  getALL(): void {
    const startDate = '2013-10-01';
    const endDate = '2030-10-31';

    this.subscriptionService.getSubscriptionsByDates(startDate, endDate).subscribe(
      (data: Subscription[]) => {
        this.subscriptions = data;
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
      }
    );
  }

  onEdit(subscriptionId?: string): void {
    if (subscriptionId) {
      this.editSubscriptionId = subscriptionId;
    }
  }

  onSave(subscription: Subscription): void {
    this.subscriptionService.updateSubscription(subscription).subscribe(
      (updatedSubscription) => {
        // Update the local list with the new subscription data
        const index = this.subscriptions.findIndex(sub => sub.numSub === updatedSubscription.numSub);
        if (index > -1) {
          this.subscriptions[index] = updatedSubscription;
        }
        this.editSubscriptionId = null; // Exit edit mode
      },
      (error) => {
        console.error('Error updating subscription:', error);
      }
    );
  }

  onCancel(): void {
    this.editSubscriptionId = null; // Exit edit mode without saving changes
  }

  onDelete(subscriptionId: string): void {
    this.subscriptionService.deleteSubscription(subscriptionId).subscribe(
      () => {
        // Remove the deleted subscription from the displayed list
        this.subscriptions = this.subscriptions.filter(sub => sub.numSub !== subscriptionId);
      },
      (error) => {
        console.error('Error deleting subscription:', error);
      }
    );
  }
}
