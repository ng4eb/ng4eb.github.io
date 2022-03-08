import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch2P3Component } from './ch2-p3.component';

describe('Ch2P3Component', () => {
  let component: Ch2P3Component;
  let fixture: ComponentFixture<Ch2P3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch2P3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch2P3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
