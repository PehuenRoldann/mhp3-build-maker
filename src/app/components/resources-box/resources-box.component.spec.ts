import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesBoxComponent } from './resources-box.component';

describe('ResourcesBoxComponent', () => {
  let component: ResourcesBoxComponent;
  let fixture: ComponentFixture<ResourcesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourcesBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourcesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
