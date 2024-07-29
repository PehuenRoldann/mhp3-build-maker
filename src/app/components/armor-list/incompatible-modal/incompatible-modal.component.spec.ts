import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompatibleModalComponent } from './incompatible-modal.component';

describe('IncompatibleModalComponent', () => {
  let component: IncompatibleModalComponent;
  let fixture: ComponentFixture<IncompatibleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncompatibleModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncompatibleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
