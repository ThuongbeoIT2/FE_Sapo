import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOsUpdateFormComponent } from './product-os-update-form.component';

describe('ProductOsUpdateFormComponent', () => {
  let component: ProductOsUpdateFormComponent;
  let fixture: ComponentFixture<ProductOsUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOsUpdateFormComponent]
    });
    fixture = TestBed.createComponent(ProductOsUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
