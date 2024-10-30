import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSettingComponent } from './list-setting.component';

describe('ListSettingComponent', () => {
  let component: ListSettingComponent;
  let fixture: ComponentFixture<ListSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSettingComponent]
    });
    fixture = TestBed.createComponent(ListSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
