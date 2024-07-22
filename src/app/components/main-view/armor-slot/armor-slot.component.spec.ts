import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSlotComponent } from './armor-slot.component';

describe('ArmorSlotComponent', () => {
  let component: ArmorSlotComponent;
  let fixture: ComponentFixture<ArmorSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArmorSlotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArmorSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
