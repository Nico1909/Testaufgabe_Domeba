import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { CustomValidators } from '../../0_public/custom-validator';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../../app.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(null),
    email: new FormControl(null, [Validators.email]),
    password: new FormControl(null, [Validators.required])
  }, { validators: CustomValidators.EmailOrUsernameEntered });

  userForLogin: User = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: '',
    Email: ''
  }

  constructor(private authenticationService: AuthenticationService, private router: Router, private snackbar: MatSnackBar) {}

  HidePassword = true;

  login() {
    this.authenticationService.login(this.userForLogin).subscribe({
      next: (user) => {
        console.log("login erfolgreich!");
        AppComponent.isUserLogin = true;
        this.router.navigateByUrl('');
      },
      error: (res) => {
        this.snackbar.open("Anmeldung fehlgeschlagen!", "OK", {
          duration: 3000
         });
        console.log("login fehlgeschlagen!");
      }
    });
  }

  loginWithoutAccount() {
    AppComponent.isUserLogin = true;
    this.router.navigateByUrl('');
  }

}
