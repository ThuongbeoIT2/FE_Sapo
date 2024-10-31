import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductOsComponent } from './manage-product-os.component';

describe('ManageProductOsComponent', () => {
  let component: ManageProductOsComponent;
  let fixture: ComponentFixture<ManageProductOsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductOsComponent]
    });
    fixture = TestBed.createComponent(ManageProductOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
