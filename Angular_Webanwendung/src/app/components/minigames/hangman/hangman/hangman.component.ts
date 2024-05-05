import { Component, OnInit } from '@angular/core';
import { HangmanService } from '../services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent implements OnInit{
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';

  restartGameBtnShown: boolean = false;

  constructor(private hangmanService: HangmanService) {}

  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe((response) => {
      this.category = response.category;
      this.questions = response.items;
      this.pickNewQuestion();
    });
  }

  guess(letter: string) {
    if(!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [... this.guesses, letter];
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtnShown = false;
  }

  pickNewQuestion() {
    const index = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[index];
    console.log(this.question);
  }

  onGameFinished() {
    this.restartGameBtnShown = true;
  }
}
