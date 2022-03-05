import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsWidgetComponent } from './options-widget.component';

describe('OptionsWidgetComponent', () => {
  let component: OptionsWidgetComponent;
  let fixture: ComponentFixture<OptionsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
