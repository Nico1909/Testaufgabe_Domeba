import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GameengineSnakeComponent } from './components/minigames/snake/gameengine-snake/gameengine-snake.component';
import { HangmanComponent } from './components/minigames/hangman/hangman/hangman.component';
import { DotsFillerComponent } from './components/minigames/dots-filler/dots-filler/dots-filler.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }, 
  {
    path: 'games/snake',
    component: GameengineSnakeComponent
  },
  {
    path: 'games/hangman',
    component: HangmanComponent
  },
  {
    path: 'games/dots-filler',
    component: DotsFillerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
