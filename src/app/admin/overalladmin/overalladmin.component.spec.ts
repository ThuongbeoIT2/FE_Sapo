import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OveralladminComponent } from './overalladmin.component';

describe('OveralladminComponent', () => {
  let component: OveralladminComponent;
  let fixture: ComponentFixture<OveralladminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OveralladminComponent]
    });
    fixture = TestBed.createComponent(OveralladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
