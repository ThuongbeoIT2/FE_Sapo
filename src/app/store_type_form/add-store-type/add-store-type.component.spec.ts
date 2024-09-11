import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreTypeComponent } from './add-store-type.component';

describe('AddStoreTypeComponent', () => {
  let component: AddStoreTypeComponent;
  let fixture: ComponentFixture<AddStoreTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStoreTypeComponent]
    });
    fixture = TestBed.createComponent(AddStoreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
