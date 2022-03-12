import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch3P4Component } from './ch3-p4.component';

describe('Ch3P4Component', () => {
  let component: Ch3P4Component;
  let fixture: ComponentFixture<Ch3P4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch3P4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch3P4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
