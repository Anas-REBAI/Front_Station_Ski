import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubscriptionComponent } from './all-subscription.component';

describe('AllSubscriptionComponent', () => {
  let component: AllSubscriptionComponent;
  let fixture: ComponentFixture<AllSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
