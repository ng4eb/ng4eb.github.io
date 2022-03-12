import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch3P3Component } from './ch3-p3.component';

describe('Ch3P3Component', () => {
  let component: Ch3P3Component;
  let fixture: ComponentFixture<Ch3P3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch3P3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch3P3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
