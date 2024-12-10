import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSalesComponent } from './product-list-sales.component';

describe('ProductListSalesComponent', () => {
  let component: ProductListSalesComponent;
  let fixture: ComponentFixture<ProductListSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListSalesComponent]
    });
    fixture = TestBed.createComponent(ProductListSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
