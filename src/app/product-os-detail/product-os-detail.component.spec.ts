import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOSDetailComponent } from './product-os-detail.component';

describe('ProductOSDetailComponent', () => {
  let component: ProductOSDetailComponent;
  let fixture: ComponentFixture<ProductOSDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOSDetailComponent]
    });
    fixture = TestBed.createComponent(ProductOSDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
