import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPageComponent } from './subscription-page.component';

describe('SubscriptionPageComponent', () => {
  let component: SubscriptionPageComponent;
  let fixture: ComponentFixture<SubscriptionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
