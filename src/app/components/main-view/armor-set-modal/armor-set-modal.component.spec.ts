import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSetModalComponent } from './armor-set-modal.component';

describe('ArmorSetModalComponent', () => {
  let component: ArmorSetModalComponent;
  let fixture: ComponentFixture<ArmorSetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArmorSetModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArmorSetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
