import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubscriptionComponent } from './components/subscription/add-subscription/add-subscription.component';
import { AllSubscriptionComponent } from './components/subscription/all-subscription/all-subscription.component';

const routes: Routes = [
  { path: 'add-subscription', component: AddSubscriptionComponent },
  { path: 'all-subscription', component: AllSubscriptionComponent },
  { path: '', redirectTo: '/all-subscription', pathMatch: 'full' },  // Redirect the default path
  { path: '**', redirectTo: '/all-subscription' }  // Wildcard route to handle undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
