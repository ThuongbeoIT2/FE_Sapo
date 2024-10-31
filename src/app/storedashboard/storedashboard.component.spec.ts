import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredashboardComponent } from './storedashboard.component';

describe('StoredashboardComponent', () => {
  let component: StoredashboardComponent;
  let fixture: ComponentFixture<StoredashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoredashboardComponent]
    });
    fixture = TestBed.createComponent(StoredashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
