import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerproductStatisComponent } from './managerproduct-statis.component';

describe('ManagerproductStatisComponent', () => {
  let component: ManagerproductStatisComponent;
  let fixture: ComponentFixture<ManagerproductStatisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerproductStatisComponent]
    });
    fixture = TestBed.createComponent(ManagerproductStatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
