import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationWrapperComponent } from './pagination-wrapper.component';

describe('PaginationWrapperComponent', () => {
  let component: PaginationWrapperComponent;
  let fixture: ComponentFixture<PaginationWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationWrapperComponent]
    });
    fixture = TestBed.createComponent(PaginationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
