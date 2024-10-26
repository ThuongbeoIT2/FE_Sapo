import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStoreTypeFormComponent } from './update-store-type-form.component';

describe('UpdateStoreTypeFormComponent', () => {
  let component: UpdateStoreTypeFormComponent;
  let fixture: ComponentFixture<UpdateStoreTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStoreTypeFormComponent]
    });
    fixture = TestBed.createComponent(UpdateStoreTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
