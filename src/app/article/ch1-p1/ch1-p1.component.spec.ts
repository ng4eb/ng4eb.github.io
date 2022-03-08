import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch1P1Component } from './ch1-p1.component';

describe('Ch1P1Component', () => {
  let component: Ch1P1Component;
  let fixture: ComponentFixture<Ch1P1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch1P1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch1P1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
