import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoretypeComponent } from './storetype.component';

describe('StoretypeComponent', () => {
  let component: StoretypeComponent;
  let fixture: ComponentFixture<StoretypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoretypeComponent]
    });
    fixture = TestBed.createComponent(StoretypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
