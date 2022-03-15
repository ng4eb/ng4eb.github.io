import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch5P1Component } from './ch5-p1.component';

describe('Ch5P1Component', () => {
  let component: Ch5P1Component;
  let fixture: ComponentFixture<Ch5P1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch5P1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch5P1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
