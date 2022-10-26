import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthRequest } from 'src/app/core/interfaces/Requests/IAuthRequest';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  public loginForm! : FormGroup;
  
  /* Injectable Services */
  private _formBuilder: FormBuilder;
  private _router: Router;
  private _route: ActivatedRoute;
  private _authService: AuthService;
  
  /* Private members */
  private returnUrl!: string;

  constructor(formBuilder: FormBuilder, 
    router: Router, 
    activatedRoute: ActivatedRoute,
    authService: AuthService) 
  {
    this._formBuilder = formBuilder;
    this._router = router;
    this._route = activatedRoute;
    this._authService = authService;
  }

  ngOnInit(): void 
  {
    
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }



  public onLoginClicked(): void{
    if(this.loginForm.invalid)
      return;
    
    const auth_request: IAuthRequest = {
      Username: this.loginForm.value.username,
      Password: this.loginForm.value.password
    };
    
    this._authService.login(auth_request).subscribe({
      next: (data => {
        console.log(data)
      }),
      error: (error => {
        console.log(error)
      })
    });

  }

}
