import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderloginComponent } from './sliderlogin.component';

describe('SliderloginComponent', () => {
  let component: SliderloginComponent;
  let fixture: ComponentFixture<SliderloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderloginComponent]
    });
    fixture = TestBed.createComponent(SliderloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
