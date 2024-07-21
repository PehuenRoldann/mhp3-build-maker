import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsBoxComponent } from './skills-box.component';

describe('SkillsBoxComponent', () => {
  let component: SkillsBoxComponent;
  let fixture: ComponentFixture<SkillsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
