import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorListItemComponent } from './armor-list-item.component';

describe('ArmorListItemComponent', () => {
  let component: ArmorListItemComponent;
  let fixture: ComponentFixture<ArmorListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArmorListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArmorListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
