import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchv02Component } from './searchv02.component';

describe('Searchv02Component', () => {
  let component: Searchv02Component;
  let fixture: ComponentFixture<Searchv02Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Searchv02Component]
    });
    fixture = TestBed.createComponent(Searchv02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
