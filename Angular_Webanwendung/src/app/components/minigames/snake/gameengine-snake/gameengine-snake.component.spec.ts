import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameengineSnakeComponent } from './gameengine-snake.component';

describe('GameengineSnakeComponent', () => {
  let component: GameengineSnakeComponent;
  let fixture: ComponentFixture<GameengineSnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameengineSnakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameengineSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
