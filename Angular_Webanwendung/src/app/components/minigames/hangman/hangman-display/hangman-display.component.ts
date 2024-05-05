import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrl: './hangman-display.component.css'
})
export class HangmanDisplayComponent implements OnInit, OnChanges {
  @Input() guesses: string[] = [];
  @Input() question: string = '';
  @Output() gameFinished = new EventEmitter<boolean>();

  MAX_MISTAKES = 7;
  mistakesRemaining: number;
  success: boolean = false;

  constructor() {
    this.mistakesRemaining = this.MAX_MISTAKES;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes?.['question']?.currentValue && changes?.['question'].currentValue !== changes?.['question'].previousValue) {
      this.mistakesRemaining = this.MAX_MISTAKES;
      this.success = false;
    }

    const guessesCurrentValue = changes?.['guesses']?.currentValue;

    if (
      guessesCurrentValue &&
      guessesCurrentValue.length &&
      guessesCurrentValue != changes['guesses'].previousValue) {
      this.checkGuess(guessesCurrentValue[guessesCurrentValue.length - 1]);
    }
  }

  checkGuess(letter: string) {
    let hasWon = true;
    this.mistakesRemaining -= this.wasGuessAMistake(letter);

    for (let i = 0; i < this.question.length; i++) {
      if(!this.guesses.find((guess) => guess.toLowerCase() === this.question[i].toLowerCase())) {
        hasWon = false;
        break;
      }
    }

    this.success = hasWon;
    if(this.success || this.mistakesRemaining === 0) {
      console.log("Game ended!");
      this.gameFinished.emit(this.success);
    }

    console.log(this.mistakesRemaining);
  }

  wasGuessAMistake(letter: string): number {
    for(let i = 0; i < this.question.length; i++) {
      if(this.question[i].toLowerCase() === letter.toLowerCase())
        return 0;
    }

    return 1;
  }
}
