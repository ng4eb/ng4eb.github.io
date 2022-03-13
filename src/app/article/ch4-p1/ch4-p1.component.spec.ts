import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch4P1Component } from './ch4-p1.component';

describe('Ch4P1Component', () => {
  let component: Ch4P1Component;
  let fixture: ComponentFixture<Ch4P1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch4P1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch4P1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
