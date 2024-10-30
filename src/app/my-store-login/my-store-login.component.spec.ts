import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoreLoginComponent } from './my-store-login.component';

describe('MyStoreLoginComponent', () => {
  let component: MyStoreLoginComponent;
  let fixture: ComponentFixture<MyStoreLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyStoreLoginComponent]
    });
    fixture = TestBed.createComponent(MyStoreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
