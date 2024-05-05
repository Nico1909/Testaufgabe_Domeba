import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboardSnakeComponent } from './gameboard-snake.component';

describe('GameboardSnakeComponent', () => {
  let component: GameboardSnakeComponent;
  let fixture: ComponentFixture<GameboardSnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameboardSnakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameboardSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
