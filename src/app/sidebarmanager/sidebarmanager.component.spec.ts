import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarmanagerComponent } from './sidebarmanager.component';

describe('SidebarmanagerComponent', () => {
  let component: SidebarmanagerComponent;
  let fixture: ComponentFixture<SidebarmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarmanagerComponent]
    });
    fixture = TestBed.createComponent(SidebarmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
