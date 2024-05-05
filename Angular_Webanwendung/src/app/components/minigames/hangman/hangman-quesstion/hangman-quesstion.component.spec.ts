import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanQuesstionComponent } from './hangman-quesstion.component';

describe('HangmanQuesstionComponent', () => {
  let component: HangmanQuesstionComponent;
  let fixture: ComponentFixture<HangmanQuesstionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HangmanQuesstionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HangmanQuesstionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
