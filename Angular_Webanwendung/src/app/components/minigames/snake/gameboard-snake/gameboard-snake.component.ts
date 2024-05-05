import { Component, OnInit, ContentChild, Input } from '@angular/core';
import { SnakeComponent } from '../snake/snake.component';

@Component({
  selector: 'app-gameboard-snake',
  templateUrl: './gameboard-snake.component.html',
  styleUrl: './gameboard-snake.component.css'
})
export class GameboardSnakeComponent implements OnInit{
  
  @Input()
  width!: number;

  @Input()
  height!: number;

  @Input()
  food!: { x: number; y: number };

  widthArray!: Array<number>;
  heightArray!: Array<number>;

  @ContentChild(SnakeComponent)
  snake!: SnakeComponent;

  constructor() {}

  ngOnInit() {
    this.widthArray = new Array(this.width).fill(0).map((x, i) => i);
    this.heightArray = new Array(this.height).fill(0).map((x, i) => i);
  }

  isSnake(x: number, y: number): boolean {
    return this.snake.pos.some((coords) => coords.x === x && coords.y === y);
  }

}
