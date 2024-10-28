import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailCardComponent } from './category-detail-card.component';

describe('CategoryDetailCardComponent', () => {
  let component: CategoryDetailCardComponent;
  let fixture: ComponentFixture<CategoryDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryDetailCardComponent]
    });
    fixture = TestBed.createComponent(CategoryDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
