import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";

export class CustomValidators {

  private static authenticationService: AuthenticationService;
    
    static PasswordsMatching(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password')?.value;
      const passwordConfirm = control.get('passwordConfirm')?.value;
  
      // Check if passwords are matching. If not then add the error 'passwordsNotMatching: true' to the form
      if ((password === passwordConfirm) && (password !== null && passwordConfirm !== null)) {
        return null;
      } else {
        return { passwordsNotMatching: true };
      }
    }


    static EmailOrUsernameEntered(control: AbstractControl): ValidationErrors | null {
      const email = control.get('email')?.value;
      const userName = control.get('userName')?.value;

      
      // Check if user entered data for his userName or email. If not then add the error 'loginDataNeeded: true' to the form
      if(email === "" && userName === "")
        return {loginDataNeeded: true};
        
      return null;
    }

  }