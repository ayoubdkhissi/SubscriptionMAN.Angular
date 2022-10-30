import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegisterRequest } from 'src/app/core/interfaces/Requests/IRegisterRequest';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { matchValidator } from 'src/app/shared/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm! : FormGroup;
  public snackBar: MatSnackBar;
  public errors: string[] = [];

  private isLoggedIn: boolean= false;

  /* Injectable Services */
  private _formBuilder: FormBuilder;
  private _router: Router;
  private _authService: AuthService;
  private _tokenService: TokenService;
  
  constructor(formBuilder: FormBuilder, 
    router: Router, 
    authService: AuthService,
    snackBar: MatSnackBar,
    tokenService: TokenService) 
  {
    this._formBuilder = formBuilder;
    this._router = router;
    this._authService = authService;
    this.snackBar = snackBar;
    this._tokenService = tokenService;
  }



  ngOnInit(): void 
  {

    this.isLoggedIn = this._tokenService.isLoggedIn();
    if(this.isLoggedIn)
    {
      this.snackBar.open("You can't access this page, you are already logged in!", 'dismiss', {
        duration: 2000,
        panelClass: ['red-snackbar']
      });

      this._router.navigate(['home']);
    }
    
    this.registerForm = this._formBuilder.group({
      email: ['ayoub.dkhissi@gmail.com', [Validators.required ,Validators.email]],
      username: ['ayoub_dkhissi', [Validators.required, Validators.pattern("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]],
      phoneNumber: ['0652545856', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]],
      password: ['Admin@123', [Validators.required, Validators.minLength(6)]],
      rePassword : ['Admin@123', [Validators.required, matchValidator('password')]]

    });
  }

  
  public onRegisterClick(): void{
    if(this.registerForm.invalid)
      return;
    
      const registerRequest: IRegisterRequest = {
        userName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phoneNumber: this.registerForm.value.phoneNumber
      };

      this._authService.register(registerRequest).subscribe({
        next: data => {
          if(data.success)
          {
            console.log("User is successfully registered");
            this.snackBar.open("You are successfully registered, Please Login", '', {
              duration: 3000,
              panelClass: ['green-snackbar']
            })

            console.log("Navigation to the login page");
            this._router.navigate(['/login']);
            return;
            
          }

          this.snackBar.open("An error has occured, please Try again later", '', {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
        },
        error: err => {this.errors = err.errors;}
      });
  }

}
