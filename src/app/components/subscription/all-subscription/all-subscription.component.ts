import { Component } from '@angular/core';
import { SubcriptionService } from 'src/app/services/subscription.service';
import { Subscription } from '../../../models/subscription';

@Component({
  selector: 'app-all-subscription',
  templateUrl: './all-subscription.component.html',
  styleUrls: ['./all-subscription.component.css']
})
export class AllSubscriptionComponent {
  subscriptions: Subscription[] = [];

  constructor(private  subscriptionService: SubcriptionService 
) {}

  ngOnInit(): void {
      this.getALL()
    
  }
  getALL(){
    
// Example date range for filtering
const startDate = '2013-10-01';
const endDate = '2030-10-31';

// Call the service method to retrieve subscriptions by date range
this.subscriptionService.getSubscriptionsByDates(startDate, endDate).subscribe(
  (data: Subscription[]) => {
    this.subscriptions = data;
  },
  (error) => {
    console.error('Error fetching subscriptions:', error);
  }
);

  }
  onEdit(num :any){

  }
  onDelete(num :any){

  }
}
