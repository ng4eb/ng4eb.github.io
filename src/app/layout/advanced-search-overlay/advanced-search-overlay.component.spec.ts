import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchOverlayComponent } from './advanced-search-overlay.component';

describe('AdvancedSearchOverlayComponent', () => {
  let component: AdvancedSearchOverlayComponent;
  let fixture: ComponentFixture<AdvancedSearchOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedSearchOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
