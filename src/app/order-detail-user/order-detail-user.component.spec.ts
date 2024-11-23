import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailUserComponent } from './order-detail-user.component';

describe('OrderDetailUserComponent', () => {
  let component: OrderDetailUserComponent;
  let fixture: ComponentFixture<OrderDetailUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailUserComponent]
    });
    fixture = TestBed.createComponent(OrderDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
