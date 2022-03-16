import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch5P2Component } from './ch5-p2.component';

describe('Ch5P2Component', () => {
  let component: Ch5P2Component;
  let fixture: ComponentFixture<Ch5P2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ch5P2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch5P2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
