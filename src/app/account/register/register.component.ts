import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm! : FormGroup;

  /* Injectable Services */
  private _formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) 
  {
    this._formBuilder = formBuilder;
  }



  ngOnInit(): void 
  {
    
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required ,Validators.email]],
      username: ['', [Validators.required, Validators.pattern("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword : ['', [Validators.required, matchValidator('password')]]

    });
  }

  
  public onRegisterClick(): void{
    if(this.registerForm.invalid)
      return;
    
      console.log("A request has been sent to the server with the following credentials:", this.registerForm.value)
  }

}
