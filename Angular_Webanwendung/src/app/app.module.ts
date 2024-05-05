import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatTabsModule} from '@angular/material/tabs'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GameboardSnakeComponent } from './components/minigames/snake/gameboard-snake/gameboard-snake.component';
import { SnakeComponent } from './components/minigames/snake/snake/snake.component';
import { GameengineSnakeComponent } from './components/minigames/snake/gameengine-snake/gameengine-snake.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HangmanComponent } from './components/minigames/hangman/hangman/hangman.component';
import { HangmanDisplayComponent } from './components/minigames/hangman/hangman-display/hangman-display.component';
import { HangmanKeyboardComponent } from './components/minigames/hangman/hangman-keyboard/hangman-keyboard.component';
import { HangmanQuesstionComponent } from './components/minigames/hangman/hangman-quesstion/hangman-quesstion.component';
import {DotsFillerComponent} from './components/minigames/dots-filler/dots-filler/dots-filler.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component'



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    GameboardSnakeComponent,
    SnakeComponent,
    GameengineSnakeComponent,
    HangmanComponent,
    HangmanDisplayComponent,
    HangmanKeyboardComponent,
    HangmanQuesstionComponent,
    DotsFillerComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatListModule, 
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatMenuModule,
    MatTableModule, 
    MatSelectModule, 
    ReactiveFormsModule, 
    MatCheckboxModule, 
    HttpClientModule, 
    MatAutocompleteModule,
    MatSnackBarModule,
    DragDropModule,
    BrowserAnimationsModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
