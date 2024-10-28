import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerEventComponent } from './banner-event.component';

describe('BannerEventComponent', () => {
  let component: BannerEventComponent;
  let fixture: ComponentFixture<BannerEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerEventComponent]
    });
    fixture = TestBed.createComponent(BannerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
