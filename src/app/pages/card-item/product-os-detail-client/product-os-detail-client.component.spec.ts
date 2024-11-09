import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOsDetailClientComponent } from './product-os-detail-client.component';

describe('ProductOsDetailClientComponent', () => {
  let component: ProductOsDetailClientComponent;
  let fixture: ComponentFixture<ProductOsDetailClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOsDetailClientComponent]
    });
    fixture = TestBed.createComponent(ProductOsDetailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
