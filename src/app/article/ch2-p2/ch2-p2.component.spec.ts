import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch2P2Component } from './ch2-p2.component';

describe('Ch2P2Component', () => {
  let component: Ch2P2Component;
  let fixture: ComponentFixture<Ch2P2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch2P2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch2P2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
