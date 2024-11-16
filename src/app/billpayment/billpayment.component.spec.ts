import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillpaymentComponent } from './billpayment.component';

describe('BillpaymentComponent', () => {
  let component: BillpaymentComponent;
  let fixture: ComponentFixture<BillpaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillpaymentComponent]
    });
    fixture = TestBed.createComponent(BillpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
