import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAuthRequest } from "../interfaces/Requests/IAuthRequest";
import { IAuthResponse } from "../interfaces/Responses/IAuthResponse";
import {catchError, Observable, tap, throwError} from "rxjs"
import { IRegisterRequest } from "../interfaces/Requests/IRegisterRequest";
import { IRegisterResponse } from "../interfaces/Responses/IRegisterResponse";
import { IRefreshTokenRequest } from "../interfaces/Requests/IRefreshTokenRequest";
import { ILogoutResponse } from "../interfaces/Responses/ILogoutResponse";

@Injectable({
    providedIn: "root"
})
export class AuthService
{
    /* Constants, should be moved to env variables */
    private baseUrl: string = "https://localhost:7169/api/";
    private loginEndPoint: string = "authenticate";
    private registerEndPoint: string = "register";
    private refreshEndPoint: string = "refresh";
    private logoutEndPoint: string = "logout";

    /* Injected Services */
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient)
    {
        this._httpClient = httpClient;
    }


    public login(authRequest: IAuthRequest): Observable<IAuthResponse>
    {


        return this._httpClient.post<IAuthResponse>(this.baseUrl+this.loginEndPoint, authRequest).pipe(
            catchError(this.handleError)
        );
    }


    public register(registerRequest: IRegisterRequest): Observable<IRegisterResponse>
    {
        return this._httpClient.post<IRegisterResponse>(this.baseUrl+this.registerEndPoint, registerRequest);
    }


    public refreshToken(refreshTokenRequest: IRefreshTokenRequest): Observable<IAuthResponse>
    {
        return this._httpClient.post<IAuthResponse>(this.baseUrl + this.refreshEndPoint, refreshTokenRequest); 
    }


    public logout(): Observable<ILogoutResponse>
    {
        return this._httpClient.post<ILogoutResponse>(this.baseUrl + this.logoutEndPoint, null);
    }

    private handleError(err: HttpErrorResponse)
    {
        let errorMsg = err.error; 
        console.error(errorMsg);
        return throwError(()=>errorMsg);
    }
}
