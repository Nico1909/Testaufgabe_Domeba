import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css'
})
export class SnakeComponent {
  @Input()
  pos: { x: number; y: number }[] = [];
}
