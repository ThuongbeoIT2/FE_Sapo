import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStoreTypeComponent } from './manage-store-type.component';

describe('ManageStoreTypeComponent', () => {
  let component: ManageStoreTypeComponent;
  let fixture: ComponentFixture<ManageStoreTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStoreTypeComponent]
    });
    fixture = TestBed.createComponent(ManageStoreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
