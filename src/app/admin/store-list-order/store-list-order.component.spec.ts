import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListOrderComponent } from './store-list-order.component';

describe('StoreListOrderComponent', () => {
  let component: StoreListOrderComponent;
  let fixture: ComponentFixture<StoreListOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreListOrderComponent]
    });
    fixture = TestBed.createComponent(StoreListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
