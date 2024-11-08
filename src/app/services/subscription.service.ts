import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubcriptionService {
  apiUrl: string ="http://localhost:8082/api/subscription";

  constructor(private http: HttpClient) { }

  // Add Subscription Method
  addSubscription(subscription: Subscription): Observable<Subscription> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Subscription>(`${this.apiUrl}/add`, subscription, { headers });
  }




  // Method to retrieve subscriptions by date range
  getSubscriptionsByDates(startDate: string, endDate: string): Observable<Subscription[]> {
    const url = `${this.apiUrl}/all/${startDate}/${endDate}`;
    return this.http.get<Subscription[]>(url);
  }
}
