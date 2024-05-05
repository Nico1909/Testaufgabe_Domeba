import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppComponent } from '../../../../app.component';

const dotsAmount: number = 189;

@Component({
  selector: 'app-dots-filler',
  templateUrl: './dots-filler.component.html',
  styleUrl: './dots-filler.component.css'
})
export class DotsFillerComponent implements OnInit, OnDestroy {
  dots = Array.from(Array(dotsAmount).keys());

  colors = [
    'red',
    'green',
    'blue',
    'pink',
    'purple',
    'orange',
    'yellow',
    'cyan',
    'grey',
    'magenta',
  ];

  randomColorIndex = 0;
  counter = 25;
  myInterval: any;
  isGameStarted: boolean = false;
  isGameEnded: boolean = false;
  isWon: boolean = false;
  cleanCount: number = 0;
  dirtyCount: number = 0;

  @ViewChildren('dotRefs') dotRefs: QueryList<any> | undefined;

  ngOnInit(): void {
    AppComponent.isUserLogin=true;
   }

  ngOnDestroy(): void {
    clearInterval(this.myInterval);
  }

  changeStyle(dot: any) {
    this.randomColorIndex = Math.floor(Math.random() * 10);
    if (!this.isGameEnded) {
      dot.classList.add(this.colors[this.randomColorIndex]);
      this.checkGameStatus();
    }
  }

  startTimer() {
    this.isGameStarted = true;
    this.myInterval = setInterval(() => {
      if (this.counter > 1) {
        this.counter--;
      } else {
        this.isGameEnded = true;
      }
    }, 1000);
  }

  checkGameStatus() {
    this.cleanCount = 0;
    this.dirtyCount = 0;
    this.dotRefs?.forEach((dot) => {
      if (dot.nativeElement.classList.length > 1) {
        this.dirtyCount++;
      } else {
        this.cleanCount++;
      }
    });
    if (!this.isGameStarted) {
      this.startTimer();
    }
    if (this.dirtyCount == dotsAmount) {
      this.isWon = true;
      this.isGameEnded = true;
    }
  }

  newGame() {
    location.reload();
  }

}
