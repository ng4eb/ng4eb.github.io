import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch3P1Component } from './ch3-p1.component';

describe('Ch3P1Component', () => {
  let component: Ch3P1Component;
  let fixture: ComponentFixture<Ch3P1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch3P1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch3P1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
