import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch4P2Component } from './ch4-p2.component';

describe('Ch4P2Component', () => {
  let component: Ch4P2Component;
  let fixture: ComponentFixture<Ch4P2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch4P2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch4P2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
