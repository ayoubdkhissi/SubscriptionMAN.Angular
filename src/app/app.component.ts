import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SubscriptionMAN.Angular';

  isLoggedIn: boolean = false;

  private _snackBar: MatSnackBar;

  /* Services */
  private _tokenService: TokenService;
  private _authService: AuthService;
  private _router: Router;

  constructor(tokenService: TokenService, 
    router: Router, 
    autheService: AuthService,
    matSnackBar: MatSnackBar) 
  {
    this._tokenService = tokenService;
    this._router = router;  
    this._authService = autheService;
    this._snackBar = matSnackBar
  }

  ngOnInit() 
  {
    this.isLoggedIn = this._tokenService.isLoggedIn();

  }



  logout(): void
  {
    this._tokenService.clearSession();
    this._authService.logout();
    
    
    this._snackBar.open("Logout Success!", '', {
      duration: 2000,
      panelClass: ['green-snackbar']
    });


    setTimeout(() => {
      window.location.reload();
      this._router.navigate(['login']);
      this.isLoggedIn = false;
    }, 2000);


  }

}
