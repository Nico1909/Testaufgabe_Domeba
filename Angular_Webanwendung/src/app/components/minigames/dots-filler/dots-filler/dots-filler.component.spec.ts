import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsFillerComponent } from './dots-filler.component';

describe('DotsFillerComponent', () => {
  let component: DotsFillerComponent;
  let fixture: ComponentFixture<DotsFillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotsFillerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotsFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
