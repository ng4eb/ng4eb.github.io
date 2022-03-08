import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch1P2Component } from './ch1-p2.component';

describe('Ch1P2Component', () => {
  let component: Ch1P2Component;
  let fixture: ComponentFixture<Ch1P2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch1P2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch1P2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
