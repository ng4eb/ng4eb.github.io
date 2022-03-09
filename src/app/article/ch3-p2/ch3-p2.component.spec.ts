import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch3P2Component } from './ch3-p2.component';

describe('Ch3P2Component', () => {
  let component: Ch3P2Component;
  let fixture: ComponentFixture<Ch3P2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch3P2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch3P2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
