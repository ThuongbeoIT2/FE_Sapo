import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOsAddFormComponent } from './product-os-add-form.component';

describe('ProductOsAddFormComponent', () => {
  let component: ProductOsAddFormComponent;
  let fixture: ComponentFixture<ProductOsAddFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOsAddFormComponent]
    });
    fixture = TestBed.createComponent(ProductOsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
