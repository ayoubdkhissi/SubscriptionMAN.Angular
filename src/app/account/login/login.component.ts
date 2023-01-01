import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthRequest } from 'src/app/core/interfaces/Requests/IAuthRequest';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NONE_TYPE } from '@angular/compiler';
import { TokenService } from 'src/app/core/services/token.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  public loginForm! : FormGroup;
  public snackBar: MatSnackBar;

  /* Injectable Services */
  private _formBuilder: FormBuilder;
  private _router: Router;
  private _route: ActivatedRoute;
  private _authService: AuthService;
  private _tokenService: TokenService;
  
  /* Private members */
  private isLoggedIn = false;

  constructor(formBuilder: FormBuilder, 
    router: Router, 
    activatedRoute: ActivatedRoute,
    authService: AuthService,
    snackBar: MatSnackBar,
    tokenService: TokenService) 
  {
    this._formBuilder = formBuilder;
    this._router = router;
    this._route = activatedRoute;
    this._authService = authService;
    this.snackBar = snackBar;
    this._tokenService = tokenService;
  }

  ngOnInit(): void 
  {

    this.isLoggedIn = this._tokenService.isLoggedIn();
    if(this.isLoggedIn)
    {
      
      this._router.navigate(['home']);
    }
    
    this.loginForm = this._formBuilder.group({
      username: ['ayoub_dkhissi', [Validators.required, Validators.pattern("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]],
      password: ['Admin@123', [Validators.required, Validators.minLength(6)]]
    });

  }



  public onLoginClicked(): void{
    if(this.loginForm.invalid)
      return;
    
    const auth_request: IAuthRequest = {
      Username: this.loginForm.value.username,
      Password: this.loginForm.value.password
    };
    
    this._authService.login(auth_request).subscribe({
      next: data => {
        
        // Authentication Succeeded 
        if(data.isSuccess)
        {


          this.snackBar.open("Authentication Success!", '', {
            duration: 2000,
            panelClass: ['green-snackbar']
          });
          
          setTimeout(() => {
            this._tokenService.saveSession(data);

            window.location.reload();

          }, 1000);

          
        }
        else
          this.snackBar.open("Authentication Failled! Password or username are incorrect", '', {
            duration: 2000,
            panelClass: ['red-snackbar']
          })
      },
      error: (error => {
        this.snackBar.open("An error has occured, please Try again later", '', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      })
    });

  }

}
