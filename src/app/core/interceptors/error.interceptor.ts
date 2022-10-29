import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY, Observable, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import {IRefreshTokenRequest} from "../interfaces/Requests/IRefreshTokenRequest"
import { EmptyExpr } from "@angular/compiler";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    isRefreshingToken: boolean = false;

    /* Services */
    _tokenService: TokenService;
    _authService: AuthService;
    _router: Router;

    constructor(tokenService: TokenService, authService: AuthService, router: Router) {
        this._tokenService = tokenService;
        this._authService = authService;
        this._router = router;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        return next.handle(request)
            .pipe
            (
                tap(response => console.log(JSON.stringify(response))),

                catchError((error: HttpErrorResponse) => 
                {
                    console.log(JSON.stringify(error));

                    let session = this._tokenService.getSession();

                    if(error.status == 401 && session != null && !this._tokenService.isLoggedIn() && !this.isRefreshingToken)
                    {
                        this.isRefreshingToken = true;
                        console.log('Access Token is expired, we need to renew it');

                        var refreshTokenRequest: IRefreshTokenRequest = {
                            refreshToken: session.refreshToken
                        };

                        this._authService.refreshToken(refreshTokenRequest)
                            .subscribe
                            ({
                                next: data => 
                                {
                                    console.info('Tokens renewed, we will save them into the local storage');
                                    this._tokenService.saveSession(data);
                                },

                                error: err => {console.log("cannot Renew Token")},
                                complete: () => {this.isRefreshingToken = false;}
                            })
                    }
                    else if(error.status == 400 && error.error.errorCode === 'invalid_grant')
                    {
                        console.log('the refresh token has expired, the user must login again');
                        this._tokenService.clearSession();
                        this._router.navigate(['/login']);
                    }
                    else
                    {
                        return throwError(() => error.error)
                    }

                    return EMPTY;
                })
            )
    }
    
}

export const ErrorInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true };