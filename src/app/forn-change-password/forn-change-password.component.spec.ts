import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornChangePasswordComponent } from './forn-change-password.component';

describe('FornChangePasswordComponent', () => {
  let component: FornChangePasswordComponent;
  let fixture: ComponentFixture<FornChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornChangePasswordComponent]
    });
    fixture = TestBed.createComponent(FornChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
