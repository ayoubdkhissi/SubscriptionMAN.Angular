import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ITokenSession } from '../interfaces/ITokenSession';
import { IRefreshTokenRequest } from '../interfaces/Requests/IRefreshTokenRequest';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _tokenService: TokenService;
  private _authService: AuthService;
  private _router: Router;

  constructor(tokenService: TokenService, router: Router, authService: AuthService) {
    this._authService = authService;
    this._tokenService = tokenService;
    this._router= router;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    let session = this._tokenService.getSession();
    if(session == null)
    {
      this._router.navigate(['/login']);
      return false;
    }

    if(!this._tokenService.isLoggedIn())
    {
      console.log(`session is expired, let's renew the tokens`);
      return this.checkSession(session);
    }
    return true;
  }


  checkSession(session: ITokenSession) : Observable<boolean> 
  { 
    const refreshTokenRequest: IRefreshTokenRequest =
    {
      refreshToken: session.refreshToken
    };
    return this._authService.refreshToken(refreshTokenRequest)
      .pipe
      (
        map(data => 
          {
            console.log(`refreshToken repsonse is ${JSON.stringify(data)}`);
            this._tokenService.saveSession(data);
            return true;
          }),

          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
      )
  }
  
}
