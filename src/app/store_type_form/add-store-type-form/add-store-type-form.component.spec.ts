import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreTypeFormComponent } from './add-store-type-form.component';

describe('AddStoreTypeFormComponent', () => {
  let component: AddStoreTypeFormComponent;
  let fixture: ComponentFixture<AddStoreTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStoreTypeFormComponent]
    });
    fixture = TestBed.createComponent(AddStoreTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
