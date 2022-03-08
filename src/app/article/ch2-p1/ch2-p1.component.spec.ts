import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch2P1Component } from './ch2-p1.component';

describe('Ch2P1Component', () => {
  let component: Ch2P1Component;
  let fixture: ComponentFixture<Ch2P1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch2P1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch2P1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
