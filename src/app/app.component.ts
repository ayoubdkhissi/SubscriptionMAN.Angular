import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SubscriptionMAN.Angular';

  isLoggedIn: boolean = false;

  /* Services */
  private _tokenService: TokenService;
  private _authService: AuthService;
  private _router: Router;

  constructor(tokenService: TokenService, router: Router, autheService: AuthService) 
  {
    this._tokenService = tokenService;
    this._router = router;  
    this._authService = autheService;
  }

  ngOnInit() 
  {
    this.isLoggedIn = this._tokenService.isLoggedIn();
  }

  logout(): void
  {
    this._tokenService.clearSession();
    this._authService.logout();

    this.isLoggedIn = false;


    this._router.navigate(['login']);

    return;
  }

}
