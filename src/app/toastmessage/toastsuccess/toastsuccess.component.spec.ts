import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsuccessComponent } from './toastsuccess.component';

describe('ToastsuccessComponent', () => {
  let component: ToastsuccessComponent;
  let fixture: ComponentFixture<ToastsuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastsuccessComponent]
    });
    fixture = TestBed.createComponent(ToastsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
