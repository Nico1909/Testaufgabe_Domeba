import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { FormGroup , FormControl, Validators} from '@angular/forms';

import { CustomValidators } from '../../0_public/custom-validator';
import { Business } from '../../models/business.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { BusinessAndUser } from '../../models/businessAndUser.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


//Enum for the three different pages of register
enum RegisterPages {
  RegisterBuisness,
  RegisterUser,
  Summing
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  buisnessTypes!: string[];



  @ViewChild('password') test!: ElementRef<HTMLDataElement>;

  registerFormBuisness: FormGroup = new FormGroup({
    buisnessName: new FormControl(null, [Validators.required]),
    industryType: new FormControl(null, [Validators.required])
  });

  registerFormUser: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.PasswordsMatching}
  );

  BuisnessToAdd: Business = {
    Name: '',
    IndustryType: '',
    Users: []
  }

  UserToAdd: User = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: '',
    Email: ''
  }

  checkedAGB: boolean = false;
  checkedDataSafety: boolean = false;

  HidePassword = true;
  HidePasswordRepetition = true;

  CurrentPage: RegisterPages

  constructor(private authenticationService: AuthenticationService, private router: Router, private snackbar: MatSnackBar) {
    this.CurrentPage = RegisterPages.RegisterBuisness;
    
    // Get all possible BusinessTypes current existing in DataBase
    this.authenticationService.getAllIndustryTypesOfDb().subscribe({
      next: types => {this.buisnessTypes = types;},
      error: res => {console.log("Couldnt find any businessTypes!");}
    });
  }

  register() {

    let busAndUser: BusinessAndUser = {
      Business: this.BuisnessToAdd, 
      User: this.UserToAdd
    }

    //this.BuisnessToAdd.Users.push(this.UserToAdd);

    this.authenticationService.registerBusinessWithUser(busAndUser)
    .subscribe({
      next: (business) => {
        this.snackbar.open("Registrierung erfolgreich!", "OK", {
          duration: 3000
         });
         this.router.navigateByUrl('');
      },
      error: (res) => {
        this.snackbar.open("Registrierung fehlgeschlagen!", "OK", {
          duration: 3000
         });
      }
    });
  }

  switchRegisterUserPage(page: RegisterPages) {
    this.authenticationService.checkIfUsernameExists(this.UserToAdd.UserName)
      .subscribe({
        next: (bool) => {
          if(bool)
            this.snackbar.open("Benutzername bereits vorhanden", "OK", {
              duration: 3000
             });
          else
           this.CurrentPage = page;
        },
        error: (res) => {
          this.snackbar.open("Fehler bei Verbindung zur Datenbank", "OK", {
            duration: 3000
           });
        }
      });
  }


  switchPage(page: RegisterPages) {
    this.CurrentPage = page;
  }

  togglePassword() {
    if(this.test.nativeElement.className == '') {
      this.test.nativeElement.className = "password_field";
    } else {
      this.test.nativeElement.className = "";
    }
  }
}


