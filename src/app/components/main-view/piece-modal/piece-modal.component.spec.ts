import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceModalComponent } from './piece-modal.component';

describe('PieceModalComponent', () => {
  let component: PieceModalComponent;
  let fixture: ComponentFixture<PieceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
